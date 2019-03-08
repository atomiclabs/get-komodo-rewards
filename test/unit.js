import test from 'ava';
import getKomodoRewards from '..';

test('getKomodoRewards is exported', t => {
	t.not(getKomodoRewards, undefined);
});

test('getKomodoRewards() returns a number', t => {
	t.is(0, getKomodoRewards({tiptime: 1, locktime: 1, height: 1, satoshis: 1}));
});

test('getKomodoRewards() throws a TypeError if tiptime property is not a number', t => {
	const error = t.throws(() => {
		getKomodoRewards({tiptime: undefined, locktime: 1, height: 1, satoshis: 1});
	});
	t.true(error instanceof TypeError);
	t.is(error.message, '`tiptime` option must be a number.');
});

test('getKomodoRewards() throws a TypeError if locktime property is not a number', t => {
	const error = t.throws(() => {
		getKomodoRewards({tiptime: 1, locktime: undefined, height: 1, satoshis: 1});
	});
	t.true(error instanceof TypeError);
	t.is(error.message, '`locktime` option must be a number.');
});

test('getKomodoRewards() throws a TypeError if height property is not a number', t => {
	const error = t.throws(() => {
		getKomodoRewards({tiptime: 1, locktime: 1, height: undefined, satoshis: 1});
	});
	t.true(error instanceof TypeError);
	t.is(error.message, '`height` option must be a number.');
});
