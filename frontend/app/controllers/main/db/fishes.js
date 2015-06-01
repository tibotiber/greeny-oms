import Ember from 'ember';
import ColumnDefinition from 'ember-table/models/column-definition';

export default Ember.ArrayController.extend({

    nbOfRecords: function() {
	this.set('isLoading', false);
	return this.get('model.content').length;
    }.property('model.content'),

    // setup table
    columns: function() {
	var code = ColumnDefinition.create({
	    savedWidth: 70,
	    textAlign: 'text-align-left',
	    headerCellName: 'Code',
	    contentPath: 'id',
	    canAutoResize: true
	});
	var family = ColumnDefinition.create({
	    savedWidth: 100,
	    textAlign: 'text-align-left',
	    headerCellName: 'Family',
	    contentPath: 'family.name',
	    canAutoResize: true
	});
	var name = ColumnDefinition.create({
	    savedWidth: 250,
	    textAlign: 'text-align-left',
	    headerCellName: 'Name',
	    contentPath: 'name',
	    canAutoResize: true
	});
	var scientificName = ColumnDefinition.create({
	    savedWidth: 250,
	    textAlign: 'text-align-left',
	    headerCellName: 'Scientific Name',
	    contentPath: 'scientificName',
	    canAutoResize: true
	});
	var chineseName = ColumnDefinition.create({
	    savedWidth: 150,
	    textAlign: 'text-align-left',
	    headerCellName: 'Chinese Name',
	    contentPath: 'chineseName',
	    canAutoResize: true
	});
	return [code, family, name, scientificName, chineseName];
    }.property(),

    // setup pagination
    queryParams: ['page','limit','sort'],
    page: 1,
    limit: 50,
    sort: 'code',
    isLoading: false,
    prevPage: function() {
	return this.get('page') - 1;
    }.property('page'),
    nextPage: function() {
	return this.get('page') + 1;
    }.property('page'),
    isFirstPage: function() {
	return this.get('page') === 1;
    }.property('page'),
    isLastPage: function() {
	return this.get('nbOfRecords') !== this.get('limit');
    }.property('nbOfRecords','limit')
    
});
