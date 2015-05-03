import Ember from 'ember';
import env from '../config/environment';

export function sailsPath(params, hash) {
    var type = params[0];
    var path = env.APP.emberDataSails.host + params.slice(1).join('');
    var html;
    if(type === 'img') {
	html = '<img class="'+hash['class']+'" src="'+path+'">';
    } else {
	html = 'Error in sails-path: unknown type provided';
    }
    return new Ember.Handlebars.SafeString(html);
}

export default Ember.HTMLBars.makeBoundHelper(sailsPath);
