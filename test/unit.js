import test from 'ava';
import {utxos} from './fixtures';
import getKomodoRewards from '..';

const utxo = utxos[0];

test('getKomodoRewards is exported', t => {
	t.not(getKomodoRewards, undefined);
});

test('getKomodoRewards() returns a number', t => {
	t.true(typeof getKomodoRewards(utxo) === 'number');
});

test('getKomodoRewards() throws a TypeError if tiptime property is not a number', t => {
	const error = t.throws(() => {
		getKomodoRewards({...utxo, tiptime: undefined});
	});
	t.true(error instanceof TypeError);
	t.is(error.message, '`tiptime` option must be a number.');
});

test('getKomodoRewards() throws a TypeError if locktime property is not a number', t => {
	const error = t.throws(() => {
		getKomodoRewards({...utxo, locktime: undefined});
	});
	t.true(error instanceof TypeError);
	t.is(error.message, '`locktime` option must be a number.');
});

test('getKomodoRewards() throws a TypeError if height property is not a number', t => {
	const error = t.throws(() => {
		getKomodoRewards({...utxo, height: undefined});
	});
	t.true(error instanceof TypeError);
	t.is(error.message, '`height` option must be a number.');
});

test('getKomodoRewards() throws a TypeError if satoshis property is not a number', t => {
	const error = t.throws(() => {
		getKomodoRewards({...utxo, satoshis: undefined});
	});
	t.true(error instanceof TypeError);
	t.is(error.message, '`satoshis` option must be a number.');
});
