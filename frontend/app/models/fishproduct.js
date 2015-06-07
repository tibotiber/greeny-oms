import DS from 'ember-data';

export default DS.Model.extend({
    name		: DS.attr('string'),
    scientificName	: DS.attr('string'),
    chineseName		: DS.attr('string'),
    cachedSkuPicker	: DS.attr('string'),
    family		: DS.belongsTo('fishfamily'),
    
    commonName: function() {
	return this.get('family.name') + ' ' + this.get('name');
    }.property('family', 'name')
    
});
