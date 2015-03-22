#!/bin/sh
IFS=,
{
    read line;
    while read policy accrec accpay documentation packing qualitycheck purchasing sales manager
    do
	cp p_xxx.js p_$policy.js
	TEST='    if(admin'
	if [ $accrec -eq 1 ]; then
	    TEST=${TEST}' || accounts_receivable'
	fi
	if [ $accpay -eq 1 ]; then
	    TEST=${TEST}' || accounts_payable'
	fi
	if [ $documentation -eq 1 ]; then
	    TEST=${TEST}' || documentation'
	fi
	if [ $packing -eq 1 ]; then
	    TEST=${TEST}' || packing'
	fi
	if [ $qualitycheck -eq 1 ]; then
	    TEST=${TEST}' || quality_check'
	fi
	if [ $purchasing -eq 1 ]; then
	    TEST=${TEST}' || purchasing'
	fi
	if [ $sales -eq 1 ]; then
	    TEST=${TEST}' || sales'
	fi
	if [ $manager -eq 1 ]; then
	    TEST=${TEST}' || manager'
	fi
	TEST=${TEST}')'
	sed -i '/xxx/c\'${TEST} p_$policy.js
    done
} < policies.csv
