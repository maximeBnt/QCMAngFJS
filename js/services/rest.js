module.exports=function($http,$resource,$location,restConfig,$sce) {
    var self=this;
    if(angular.isUndefined(this.messages))
        this.messages=new Array();

    this.getParams=function(){
        return '?token='+restConfig.server.privateToken+'&force='+restConfig.server.force;
    }
    this.headers={ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Accept': 'application/json'
    };


        ////////// GET ALL //////////

    this.getAll=function(response,what, param, id){
        if (!isset(param), !isset(id)) {
            var request = $http({
                method: "GET",
                url: restConfig.server.restServerUrl+what+this.getParams(),
                headers: {'Accept': 'application/json'},
                callback: 'JSON_CALLBACK'
            });
        }
        else{
            var request = $http({
                method: "GET",
                url: restConfig.server.restServerUrl+what+"/"+param+"/"+id+this.getParams(),
                headers: {'Accept': 'application/json'},
                callback: 'JSON_CALLBACK'
            });

        }

        request.success(function(data, status, headers, config) {
            response[what]=data;
            restConfig[what].all=data;
            response.load=false;
        }).
            error(function(data, status, headers, config) {
                self.addMessage({type: "danger", content: "Erreur de connexion au serveur, statut de la réponse : "+status});
                console.log("Erreur de connexion au serveur, statut de la réponse : "+status);
            });
    };


        ////////// GET ONE //////////

    this.getOne= function (response, what, id) {
        var request = $http({
            method: "GET",
            url: restConfig.server.restServerUrl+what+"/"+id+this.getParams(),
            headers: {'Accept': 'application/json'},
            callback: 'JSON_CALLBACK'
        });
        request.success(function(data, status, headers, config) {
            response[what]=data;
        }).
            error(function(data, status, headers, config) {
                self.addMessage({type: "danger", content: "Erreur de connexion au serveur, statut de la réponse : "+status});
                console.log("Erreur de connexion au serveur, statut de la réponse : "+status);
            });

    };

    this.post=function(response,what,name,callback){
        if(angular.isUndefined(callback))
            this.clearMessages();
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $http.defaults.headers.post["Accept"] = "application/json";

        var request = $http({
            method: "POST",
            url: restConfig.server.restServerUrl+what+this.getParams(),
            data: response.posted,
            headers: self.headers
        });
        request.success(function(data, status, headers, config) {
            self.addMessage(data.message);
            if(angular.isUndefined(callback)){
                $location.path("/"+what);
            }else{
                callback();
            }
        }).error(function(data, status, headers, config){
            self.addMessage({type: "warning", content:"Erreur de connexion au serveur, statut de la réponse : "+status+"<br>"+data.message});
        });
    };

    this.put=function(id,response,what,name,callback){
        if(angular.isUndefined(callback))
            this.clearMessages();
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        $http.defaults.headers.post["Accept"] = "text/plain";
        var request = $http({
            method: "PUT",
            url: restConfig.server.restServerUrl+what+'/'+id+this.getParams(),
            data: response.posted,
            headers: self.headers
        });
        request.success(function(data, status, headers, config) {
            self.addMessage(data.message);
            if(angular.isUndefined(callback)){
                $location.path("/"+what);
            }else{
                callback();
            }
        }).error(function(data, status, headers, config){
            self.addMessage({type: "warning", content: "Erreur de connexion au serveur, statut de la réponse : "+status+"<br>"+data.message});
        });
    };

    this.remove=function(object,what,callback){
        if(angular.isUndefined(callback))
            this.clearMessages();
        var request = $http({
            method: "DELETE",
            url: restConfig.server.restServerUrl+what+'/'+object.id+this.getParams(),
            headers: self.headers
        });
        request.success(function(data, status, headers, config) {
            self.addMessage(data.message);
            if(angular.isDefined(callback)){
                callback();
            }
        }).error(function(data, status, headers, config){
            self.addMessage({type: "warning", content: "Erreur de connexion au serveur, statut de la réponse : "+status+"<br>"+data.message});
        });
    };

    this.addMessage=function(message){
        content=$sce.trustAsHtml(message.content);
        self.messages.push({"type":message.type,"content":content});
    };

    this.clearMessages=function(){
        self.messages.length=0;
    };


    function isset(  ) {
        // http://kevin.vanzonneveld.net
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: FremyCompany
        // +   improved by: Onno Marsman
        // *     example 1: isset( undefined, true);
        // *     returns 1: false
        // *     example 2: isset( 'Kevin van Zonneveld' );
        // *     returns 2: true

        var a=arguments; var l=a.length; var i=0;

        if (l==0) {
            throw new Error('Empty isset');
        }

        while (i!=l) {
            if (typeof(a[i])=='undefined' || a[i]===null) {
                return false;
            } else {
                i++;
            }
        }
        return true;
    }

};