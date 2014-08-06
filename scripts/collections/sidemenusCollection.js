define(["jquery", "underscore", "Backbone"],
  function($, _, Backbone) {
	var SidemenuModel = Backbone.Model.extend({
		defaults: {
		  urloffline: "nothing",
		  userfriendly: "no text in here"
		}
	});
	var SidemenusCollectionVar = Backbone.Collection.extend({
		// url: dpd_server+'sidemenu/?{"navmobile":true,"$sort":"seq"}',
		model: SidemenuModel,
		initialize: function() {
			var _this = this;
			if (window.heavyDebug) console.log('initializing sidemenuCollection');
			_this.on("sync", function(collection, models) {
				// if (window.heavyDebug) console.log(collection);
				// if (window.heavyDebug) console.log(models);
				$.when( lao.save_local('sidemenu',models), dao.save_local('sidemenu',models) ) .done(function( lao_result, dao_result ) {
					if (window.heavyDebug) console.log('sidemenu cached in local.storage and evtl. saved offline offline db');
				});
			});
			/*
			if (isConnectedToInternet()==true) {
				alert('isConnectedToInternet()==true');
			} else {
				alert('isConnectedToInternet()!=true');
			}
			*/
		},
		fetch: function(options) {
				var _this = this;
				// _this.options = options;
				var options = options || {};
				// if (window.heavyDebug) console.log('fetching SidemenuCollection');
				// if (window.heavyDebug) console.log('options');
				// if (window.heavyDebug) console.log(options);
				if (isConnectedToInternet()==true) {
					// _this.url = dpd_server+'sidemenu/?{"navmobile":true,"$sort":"seq"}';
					var responseObjectSidemenu = Backbone.Collection.prototype.fetch.call(this, options);
					return(responseObjectSidemenu);
				}
				else {
					if (window.heavyDebug) console.log('not connected to internet ?!? :-/');
					// var responseObjectSidemenu = Backbone.Collection.prototype.fetch.call(new Backbone.Collection, options);
					// return(false);
					$.when( dao.get_local('sidemenu') ) .done(function(navistring) {
						var navistring = navistring || [{"dynContent":"Zugriff nicht gestattet","module":false,"nav":false,"navmobile":true,"navmobileshow":false,"navoffline":false,"roles":["public"],"template":false,"templateUrl":"text!views/template/HomeView.html","url":"/noaccess/","urloffline":"noaccess","userfriendly":"Kein Zugriff","id":"8d135d5af4fd588b"},{"module":false,"nav":false,"navmobile":true,"navmobileshow":false,"navoffline":false,"roles":["public"],"template":false,"url":"/help/","urloffline":"help","userfriendly":"Hilfe","id":"b1b89bbfb4623a5e"},{"dynContent":"","module":false,"nav":false,"navmobile":true,"navmobileshow":false,"navoffline":true,"roles":["public"],"template":false,"templateUrl":"text!views/template/SupportView.html","url":"/support/","urloffline":"support","userfriendly":"Support","id":"a226b1e539e438db"},{"dynContent":"<div style=\"text-align:center;\">  \t<p><img src=\"icon.png\" style=\"max-width:40%;width:500px;\"> \t</p>\t<strong>Diese Datenschutzerklärung<br>schützt Sie und uns</strong> \t \t<p style=\"font-size:0.8em;line-height:1.2em;text-align:justify center;\" class=\"resizetext\">  \t\tDatenschutzerklärung von APPinaut<br /> Diese Applikation erhebt personenbezogene Daten von ihren Nutzern.<br /> Zusammenfassung der Datenschutzerklärung<br /> Personenbezogene Daten, die zu folgenden Zwecken und unter Verwendung folgender Dienste erhoben wurden:<br /> Anmeldung und Authentifizierung<br /> Direkte Anmeldung<br /> Personenbezogene Daten: <!-- Bild, -->E-Mail, Vorname, Nachname und Nutzername<br /> Vollständige Datenschutzerklärung<br /> Verantwortliche Stelle und Eigentümer<br /> DigitalVerve - Digital Solutions, Marcel Durchholz, Wörenstieg 8, 22415 Hamburg, Deutschland. <br />Arten der erhobenen Daten<br /> Zu den Arten der bezogenen Daten, die diese Applikation entweder selbst oder über Dritte erhebt, gehören: Vorname, Nachname, Nutzername und E-Mail.<br /> Die Erhebung weiterer personenbezogener Daten kann in anderen Teilen dieser Datenschutzerklärung oder in einem sich spezifisch auf das Thema Datenerhebung beziehenden Erläuterungstext beschrieben werden.<br /> Die personenbezogenen Daten werden entweder vom Nutzer freiwillig zur Verfügung gestellt oder automatisch erhoben, wenn diese Applikation genutzt wird.<br /> Soweit nichts anderes angegeben ist, dient der Einsatz von Cookies – bzw. anderer Tracking-Tools – durch die diese Applikation oder durch die Inhaber von Fremdleistungen, die diese Applikation nutzt, der Identifizierung von Nutzern sowie der Speicherung von deren Vorlieben, und zwar zu dem einzigen Zweck, um die vom Nutzer gewünschten Dienstleistungen zu erbringen.<br /> Werden bestimmte personenbezogene Daten nicht zur Verfügung gestellt, so kann diese Applikation ihre Dienstleistungen möglicherweise nicht erbringen.<br /> Der Nutzer übernimmt die Verantwortung für die personenbezogenen Daten Dritter, die über diese Applikation veröffentlicht oder geteilt werden, und erklärt, dass er zur Angabe bzw. Bekanntgabe besagter Daten berechtigt ist, womit die verantwortliche Stelle diesbezüglich von jeglicher Verantwortung befreit ist.<br /> Methode und Ort der Datenverarbeitung<br /> Verarbeitungsmethode<br /> Die verantwortliche Stelle verarbeitet die Nutzerdaten auf ordnungsgemäße Weise und ergreift angemessene Sicherheitsmaßnahmen, um den unbefugten Zugriff und die unbefugte Weiterleitung, Modifizierung oder Vernichtung von Daten zu vermeiden.<br /> Die Datenverarbeitung wird mittels Computern oder IT-basierten Systemen durchgeführt, einem organisatorischen Verfahren und Modus folgend die strikt auf die angegebenen Zwecke abzielen. Neben der verantwortlichen Stelle wird möglicherweise auch bestimmten Kategorien von Datenverarbeitern Zugriff auf die Daten gewährt, die an der Betreibung der Website beteiligt sind (Personalverwaltung, Vertrieb, Marketing, Recht, Systemadministratoren) oder externen Parteien (wie Fremdanbietern technischer Dienstleistungen, Zustellunternehmen, Hosting-Anbietern, IT-Unternehmen oder Kommunkationsagenturen).<br /> Ort<br /> Die Daten werden am Betriebsort der verantwortlichen Stelle und an allen anderen Orten, an denen sich die mit der Datenverarbeitung beteiligten Parteien befinden, verarbeitet. Für weitere Informationen, kontaktieren Sie bitte die verantwortliche Stelle.<br /> Speicherdauer<br /> Die Daten werden so lange gespeichert, wie es für das Erbringen der vom Nutzer gewünschten Dienstleistungen notwendig ist oder für die in diesem Dokument aufgeführten Zwecke angegeben ist. Der Nutzer kann die verantwortliche Stelle jederzeit auffordern, die Daten zu sperren oder zu entfernen.<br /> Nutzung der erhobenen Daten<br /> Die Daten über den Nutzer werden erhoben, damit die Anwendung ihre Dienstleistungen erbringen kann. Darüber hinaus werden Daten zu folgenden Zwecken erhoben: Anmeldung und Authentifizierung.<br /> Die personenbezogenen Daten, die zu den aufgeführten Zwecken verwendet werden, sind in den jeweiligen Abschnitten dieses Dokuments aufgeführt.<br /> Ausführliche Angaben über die Verarbeitung personenbezogener Daten<br /> Personenbezogene Daten werden zu folgenden Zwecken unter Inanspruchnahme folgender Dienstleistungen erhoben:<br /> Anmeldung und Authentifizierung<br /> <br /> Mit der Anmeldung oder Authentifizierung berechtigen Nutzer diese Applikation, sie zu identifizieren und ihnen Zugriff auf spezifische Dienste zu gewähren.<br /> Je nachdem, was im Folgenden angegeben ist, können Drittanbieter Anmelde- und Authentifizierungsdienste bereitstellen.<br /> In diesem Fall kann diese Applikation auf einige von diesen Drittanbietern gespeicherten Daten zu Anmelde- oder Identifizierungszwecken zugreifen.<br /> Direkte Anmeldung (Diese Applikation)<br /> Nutzer melden sich an, indem sie das Anmeldeformular ausfüllen und ihre personenbezogenen Daten direkt über diese Applikation angeben.<br /> Erhobene personenbezogene Daten: Bild, Email, Nachname, Nutzername und Vorname.<br /> Weitere Informationen über die Erhebung und Verarbeitung von Daten<br /> Rechtliche Maßnahmen<br /> Die personenbezogenen Daten des Nutzers können von der verantwortlichen Stelle zu rechtlichen Zwecken in gerichtlichen Verfahren oder vor möglichen Klagen verwendet werden, die sich daraus ergeben, dass diese Applikation oder die dazugehörigen Dienste nicht ordnungsgemäß genutzt wurden.<br /> Weitere Informationen über die personenbezogenen Daten des Nutzers<br /> Neben den in dieser Datenschutzerklärung aufgeführten Informationen kann diese Applikation dem Nutzer Informationen zusenden, die sich auf bestimmte Dienste oder die Erhebung und Verarbeitung personenbezogener Daten beziehen.<br /> Systemprotokolle und Wartung<br /> Diese Applikation und die Dienste von Drittanbietern können zu Betriebs- und Wartungszwecken Dateien sammeln, die die über diese Applikation stattfindende Interaktion aufzeichnen (Systemprotokolle), oder andere personenbezogene Daten (z. B. IP-Adresse) zu diesem Zweck verwenden.<br /> Nicht in dieser Datenschutzerklärung enthaltene Informationen<br /> Weitere Informationen über die Erhebung oder Verarbeitung von personenbezogenen Daten können jederzeit von der verantwortlichen Stelle über die angegebenen Kontaktangaben angefordert werden.<br /> Rechte von Nutzern<br /> Nutzer sind jederzeit berechtigt zu erfahren, ob ihre personenbezogenen Daten gespeichert wurden, und können die verantwortliche Stelle kontaktieren, um die Inhalte und Herkunft der gespeicherten Daten zu erfahren, ihre Richtigkeit zu überprüfen, ihre Ergänzung, Löschung, Aktualisierung, Berichtigung oder Umwandlung in ein anonymisiertes Format oder die Sperrung rechtswidrig gespeicherter Daten zu verlangen sowie ihre Verarbeitung aus rechtmäßigen Gründen abzulehnen. Entsprechende Anfragen sind an die verantwortliche Stelle unter Verwendung der oben aufgeführten Kontaktangaben zu senden.<br /> Diese Applikation unterstützt keine Nicht-Verfolgen-Anfragen (do not track) durch Webbrowser.<br /> Die Information, ob benutzte Drittanbieter das Nicht-Verfolgen Protokoll befolgen, entnehmen Sie bitte der Datenschutzerklärung für den jeweiligen Dienst.<br /> Änderungen dieser Datenschutzerklärung<br /> Die verantwortliche Stelle behält sich vor, jederzeit Änderungen an dieser Datenschutzerklärung vorzunehmen, indem sie ihre Nutzer auf dieser Seite entsprechend informiert. Nutzern wird daher nahe gelegt, diese Seite regelmäßig aufzurufen und dabei das am Seitenende angegebene Datum der letzten Änderung zu prüfen. Lehnt ein Nutzer eine Änderung der Datenschutzerklärung ab, so darf er diese Applikation nicht mehr nutzen und kann die verantwortliche Stelle auffordern, seine personenbezogenen Daten zu löschen. Soweit nichts anderes angegeben ist, gilt die jeweils aktuelle Datenschutzerklärung für alle personenbezogenen Daten, die die verantwortliche Stelle über einen Nutzer gespeichert hat.<br /> Informationen über diese Datenschutzerklärung<br /> Die verantwortliche Stelle ist für die Datenschutzerklärung verantwortlich, die ab den von Iubenda bereitgestellten Modulen beginnt und auf den Servern von Iubenda gehosted wird.<br /> Begriffsbestimmungen und rechtliche Hinweise<br /> <br /> Personenbezogene Daten (oder Daten)<br /> Angaben über eine natürliche oder juristische Person, Institution oder Gesellschaft, die durch Bezug auf andere Angaben (einschließlich einer persönlichen Identifikationsnummer) – auch indirekt – bestimmt wird oder bestimmbar ist.<br /> Nutzungsdaten<br /> Informationen, die diese Applikation (oder Dienste Dritter, die diese Applikation in Anspruch nimmt), automatisch erhebt, z. B.: die IP-Adressen oder Domain-Namen der Computer von Nutzern, die diese Applikation verwenden, die URI-Adressen (Uniform Resource Identifier), die Zeit der Anfrage, die Methode, die für die Übersendung der Anfrage an den Server verwendet wurde, die Größe der empfangenen Antwort-Datei, der Zahlencode, der den Status der Server-Antwort anzeigt (erfolgreiches Ergebnis, Fehler etc.), das Herkunftsland, die Funktionen des vom Nutzer verwendeten Browsers und Betriebssystems, die diversen Zeitangaben pro Aufruf (z. B. wie viel Zeit auf jeder Seite der Anwendung verbracht wurde) und Angaben über den Pfad, dem innerhalb einer Anwendung gefolgt wurde, insbesondere die Reihenfolge der besuchten Seiten, sowie sonstige Informationen über das Betriebssystem des Geräts und/oder die IT-Umgebung des Nutzers.<br /> Nutzer<br /> Die diese Applikation verwendende Person, auf die sich die personenbezogenen Daten beziehen, und die entweder der Dateninhaber sein muss oder die vom Dateninhaber bevollmächtigt wurde.<br /> Dateninhaber<br /> Die juristische oder natürliche Person, auf die sich die personenbezogenen Daten beziehen.<br /> Datenverarbeiter<br /> Die natürliche oder juristische Person, öffentliche Verwaltung oder ein sonstiges Organ, eine sonstige Gesellschaft oder sonstige Organisation, die bzw. das von der verantwortlichen Stelle bevollmächtigt wurde, die personenbezogenen Daten gemäß dieser Datenschutzerklärung zu verarbeiten.<br /> Verantwortliche Stelle (oder Eigentümer)<br /> Die natürliche oder juristische Person, öffentliche Verwaltung oder ein sonstiges Organ, eine sonstige Gesellschaft oder sonstige Organisation mit dem Recht, möglicherweise gemeinsam mit einer weiteren verantwortlichen Stelle Entscheidungen über den Zweck und die Methoden der Verarbeitung von personenbezogenen Daten sowie die hierfür verwendeten Mittel zu treffen, einschließlich der Sicherheitsmaßnahmen bezüglich des sich auf diese Applikation beziehenden Betriebs und der Nutzung. Soweit nichts anderes angegeben ist, ist die verantwortliche Stelle die natürliche oder juristische Person, in deren Eigentum diese Applikation steht.<br /> Diese Applikation<br /> Das Hardware- oder Software-Tool, mit dem die personenbezogenen Daten des Nutzers erhoben werden.<br /> Rechtlicher Hinweis<br /> Hinweis für europäische Nutzer: Diese Datenschutzerklärung wurde unter Einhaltung der Anforderungen von Art. 10 der EG-Richtlinie Nr. 95/46/EC und gemäß den Bestimmungen der Richtlinie 2002/58/EG, überarbeitet durch Richtlinie 2009/136/EG, zum Thema Cookies verfasst.<br /> In dieser Datenschutzerklärung geht es ausschließlich um diese Applikation.<br />  \t</p>  </div><div id=\"partdiv\">partdiv content</div>","icon":"","idhref":"","module":false,"nav":false,"navmobile":true,"navmobileshow":false,"navoffline":false,"roles":["public"],"seq":0,"template":true,"templateUrl":"","url":"/privacy/","urloffline":"privacy","userfriendly":"Impressum und Datenschutz","id":"003fd11df3ba8aa2"},{"dynContent":"Herzlich willkommen. <br/><br/>Schön dass Sie unsere App geladen haben....<br/><br/>","icon":"/images/icon-home.png","idhref":"","metatitle":"","module":false,"nav":false,"navmobile":true,"navmobileshow":true,"navoffline":true,"roles":["public"],"seq":1,"template":false,"templateUrl":"text!views/template/HomeView.html","url":"/home/","urloffline":"home","userfriendly":"Home","id":"2e44223e3b80f88e"},{"bgcolor":"","datatheme":"","dynContent":"","icon":"/images/icon-login.png","idhref":"","metadescription":"","metatitle":"","module":false,"nav":false,"navmobile":true,"navmobileshow":true,"navoffline":true,"roles":["public"],"seq":90000,"template":false,"templateUrl":"text!views/template/LoginView.html","url":"/login/","urloffline":"login","userfriendly":"Login","id":"06793a4ec6c2c9da"},{"bgcolor":"","dynContent":"","idhref":"","module":false,"nav":true,"navmobile":true,"navmobileshow":false,"navoffline":true,"roles":["public"],"seq":99999,"template":true,"templateUrl":"","url":"/restore/","urloffline":"restore","userfriendly":"RESTORE","id":"b07b4b349a92196e"}];
						// var navobj = JSON.parse(navistring);
						// options.success(new Backbone.Collection(navistring));
						var myColl = new Backbone.Collection(navistring);
						_this.trigger('sync_offline',myColl);
						options.success(myColl);
						// return(new Backbone.Collection(navistring));
						// if (window.heavyDebug) console.log(_this);
						// this.trigger('error');
						// return(responseObjectSidemenu);
						// _this.url = dpd_server+'sidemenu/?{"navmobile":true,"$sort":"seq"}';
					});
				}
				// if (window.heavyDebug) console.log(this);
				// if (window.heavyDebug) console.log(options);
				// return responseObjectSidemenu;
				// alert('alernative fetching sidemenu collection');
				// this.trigger("reset");
				// var responseObjectSidemenu = Backbone.Collection.prototype.fetch.call(this, options);
				// return (new Object);
		},
		sync: function(method, model, options) {
		
			var _this = this;
			var options = options || {};
			if (window.heavyDebug) console.log(options);
			if (isConnectedToInternet()==true) {
				if (window.heavyDebug) console.log('syncing sidemenu model');
				// if (window.heavyDebug) console.log(options);
				// if (window.heavyDebug) console.log(model);
				if (window.heavyDebug) console.log(method);
				switch (method) {
					case "read": 
						options.url = dpd_server+'sidemenu/?{"navmobile":true,"$sort":"seq"}';
						break;
					case "delete":
						// options.url = "/echo/json/?delete&id="+model.get("id");
						break;
					case "update":
						// options.url = "/echo/json/?update&id="+model.get("id");
						break;
				}
				Backbone.sync.call(model, method, model, options);
			} else {
				// Backbone.sync.call(model, method, model, options);
				alert('sorry, you are offline (isConnectedToInternet()!=true) could not get/sync model in sidemnusCollection');
			}
		},
		parse: function(response, xhr) {
			var _this = this;
			var options = options || {};
			if (window.heavyDebug) console.log(options);
			if (isConnectedToInternet()==true) {
				if (window.heavyDebug) console.log('parsing sidemenu collection');
				for (n = 0; n < response.length; ++n) {
					var model = response[n];
					var access = 0;
					// if (checkAppConfigs(model.roles)==true) access = 1;
					if (access==0) if (checkRoles(model.roles)==true) access = 1;
					// if (window.heavyDebug) console.log(model.userfriendly+' > '+access);
					if (access==1) if (checkAppConfigs(model.roles)==true) access = 1;
					// if (window.heavyDebug) console.log(model.roles.toString());
					// if (window.heavyDebug) console.log(this);
					if (access>0) this.add(new SidemenuModel(model));
					else this.remove(new SidemenuModel(model));
				}
				// if (window.heavyDebug) console.log(this);
				if (window.heavyDebug) console.log('returning sidemenu collection');
			}
			return(this.models);
		}
	});
    return SidemenusCollectionVar;
  }
);