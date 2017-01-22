var mongoose = require('mongoose');
var AmazonCache = mongoose.model('AmazonCache');
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
            AmazonCache.findOne({ASIN: req.params.ASIN}, function(errors, item){
                if(errors){
                    return res.json({success: false, errors: errors})
                } else if(item){
                    return res.json({success: true, item: item});
                } else if(!item){
                    client.itemLookup({
                        idType: 'ASIN',
                        itemId: req.params.ASIN,
                        responseGroup: 'ItemAttributes,Offers,Images'
                    }, function(err, results){
                        if(err){
                            return res.json({success: false, errors:err});
                        } else {
                            if(results.Items.Item.length > 0){
                                var newItem = new AmazonCache();
                                newItem.ASIN = req.params.ASIN;
                                newItem.data = results.Items.Item[0];
                                newItem.save(function(err1){
                                    if(err1){
                                        return res.json({success: false, errors: err1});
                                    };
                                });
                                return res.json({success: true, item: newItem});
                            } else {
                                return res.json({success: false, results: results})
                            }
                        };
                    });
                }
            });
        }
    }
})();