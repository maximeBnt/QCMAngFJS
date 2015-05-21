/**
 * Created by maximeb on 27/04/15.
 */
module.exports=function() {
    var factory={breweries:{},server:{},questions:{}, questionnaires:{}};
    factory.activeBrewery=undefined;
    factory.breweries.loaded=false;
    factory.breweries.refresh="all";//all|ask
    factory.breweries.update="immediate";//deffered|immediate
    factory.server.privateToken="";
    factory.server.restServerUrl="http://127.0.0.1/rest-QCM/";
    factory.server.force=false;
    return factory;
};