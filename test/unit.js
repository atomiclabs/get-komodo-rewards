import test from 'ava';
import getKomodoRewards from '..';

test('getKomodoRewards is exported', t => {
	t.not(getKomodoRewards, undefined);
});

test('getKomodoRewards() returns a number', t => {
	t.is(0, getKomodoRewards({tiptime: 1, locktime: 1, height: 1, satoshis: 1}));
});
