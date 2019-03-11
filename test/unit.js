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

function typeErrorMacro(t, property) {
	const error = t.throws(() => {
		const input = {...utxo};
		input[property] = undefined;
		getKomodoRewards(input);
	});
	t.true(error instanceof TypeError);
	t.is(error.message, `\`${property}\` option must be a number.`);
}

typeErrorMacro.title = (_, property) => `getKomodoRewards() throws a TypeError if ${property} property is not a number`;

['tiptime', 'locktime', 'height', 'satoshis'].forEach(property => test(typeErrorMacro, property));
