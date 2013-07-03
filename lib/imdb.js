var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync(require('path').resolve(__dirname, 'jquery.min.js')).toString();

var parseOptions = {
    mainSite: 'http://www.imdb.com',
    elements: [
        {
            name: 'title',
            sel: function ($) {
                return $('#overview-top .header .itemprop').eq(0).text();
            }
        },
        {
            name: 'duration',
            sel: function($) {
                return $('#overview-top .infobar time').text().trim();
            }
        },
        {
            name: 'classification',
            sel: function($) {
                var result = $('#overview-top .infobar span').eq(0).attr('title');
                return ( result == undefined ) ? 'PG-13' : result;
            }
        },
        {
            name: 'genres',
            sel: function($) {
                var list = $('#overview-top .infobar a span.itemprop');
                var result = new Array();
                $.each(list,function(){
                    result.push( $(this).text().trim() );
                });
                return result;
            }
        },
        {
            name: 'rating',
            sel: function($) {
                return $('#overview-top .star-box .titlePageSprite').text().trim();
            }
        },
        {
            name: 'img',
            sel: function($) {
                return $("#img_primary .image a img").attr('src').trim();
            }
        },
        {
            name: 'description',
            sel: function($) {
                return $("#overview-top p").eq(1).text().trim();
            }
        },
        {
            name: 'director',
            sel: function($) {
                return $("#overview-top div.txt-block").eq(0).find("span").text().trim();
            }
        },
        {
            name: 'creator',
            sel: function($) {
                var list = $("#overview-top div.txt-block").eq(1).find('a').find("span");
                var result = new Array();
                $.each(list,function(){
                    result.push( $(this).text().trim() );
                })
                return result
            }
        },
        {
            name: 'actors',
            sel: function($) {
                var list = $("#overview-top div.txt-block").eq(2).find('a').find("span");
                var result = new Array();
                $.each(list,function(){
                    result.push( $(this).text().trim() );
                })
                return result
            }
        }
    ]
};

module.exports = function (site, cb) {
    function parse(site, jquery, callback) {
        jsdom.env({
            html: site,
            src: [ jquery],
            done: function (err, window) {
                callback(window.$, err);
            }
        });
    };

    function movieData(imdbAddress) {
        parse(imdbAddress, jquery, function ($, err) {
            var result = {};
            result['id'] = getId(imdbAddress);
            parseOptions.elements.forEach(function (elem) {
                result[elem.name] = elem.sel($);
            });

            cb(result, err);
        });
    }

    function getId(url){
        var id = url.match(/tt\d{1,}/g);
        return id[0];
    }

    if (site.search("^http://") === 0) {
        // Site is given make direct parsing
        movieData(site);
    } else {
        // We need to make extra query to get the web page
        var searchSite = parseOptions.mainSite + '/find?q=' + encodeURIComponent(site);
        parse(searchSite, jquery, function ($, err) {
            var partOf = $('td a[href^="/title"]:first').attr('href')
                , result = {};
            movieData(parseOptions.mainSite + partOf);
        });
    }
}
