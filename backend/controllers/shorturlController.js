
const {nanoid} = require('nanoid');
const Url = require('./../models/urlModel');


// Short URL Generator
exports.makeShortUrl = async (req, res) => {
    try {
        console.log("makeShortUrl")
        const { originalUrl } = req.body;
        const base = process.env.BASE_URL;
        if (isURL(originalUrl) == false) {
            return res.status(400).json({
                status: 'fail', 
                message: "Invalid Original Url'",
                requestedAt: req.requestTime,
            });
        }
        let url = await Url.findOne({ originalUrl });
        
        if (url) {
            res.status(200).json({
                status: 'success', 
                requestedAt: req.requestTime,
                data: {
                    url
                }
            });
        } else {
            const urlId = nanoid(5);
            const shortUrl = `${base}/${urlId}`;

            url = new Url({
                originalUrl,
                shortUrl,
                urlId,
                date: new Date(),
            });

            await url.save();
            res.status(200).json({
                status: 'success', 
                requestedAt: req.requestTime,
                data: {
                    url
                }
            });
        }

        console.log(req.requestTime);
        
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
    
}


exports.urlRedirect = async (req, res) => {
    try {
        const url = await Url.findOne({ urlId: req.params.urlId});

        if (url) {
            return res.redirect(url.originalUrl);
        } else {
            res.status(404).json('Not found');
        }

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getAllUrls = async (req, res) => {
    try {
        const urls = await Url.find().sort('-createAt')

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: urls.length,
            data: {
                urls
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}


function isURL(str) {
    const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    // var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    //   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    //   '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    //   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    //   '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    //   '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return urlPattern.test(str);
}

