import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    email: DS.attr('string'),
    profile_pic: DS.attr('string'),
    admin: DS.attr('boolean'),
    manager: DS.attr('boolean'),
    sales: DS.attr('boolean'),
    purchasing: DS.attr('boolean'),
    quality_check: DS.attr('boolean'),
    packing: DS.attr('boolean'),
    documentation: DS.attr('boolean'),
    accounts_payable: DS.attr('boolean'),
    accounts_receivable: DS.attr('boolean'),
    auth: DS.attr('number')
});
