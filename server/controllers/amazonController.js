var amazonKey = require('./amazonKey.js');
var amazon  = require('amazon-affiliate-api');
var client  = amazon.createClient({
        awsId: amazonKey.awsId,
        awsSecret: amazonKey.awsSecret,
        awsTag: amazonKey.awsTag
    });

module.exports = (function(){
    return {
        checkAmazonItem: function(req,res){
            client.itemLookup({
                idType: 'ASIN',
                itemId: req.params.ASIN,
                responseGroup: 'ItemAttributes,Offers,Images'
            }, function(err, results){
                if(err){
                    return res.json({success: false, errors:err});
                } else {
                    return res.json({success: true, results: results});
                };
            })
        }
    }
})();