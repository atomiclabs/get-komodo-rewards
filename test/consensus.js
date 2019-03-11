import test from 'ava';
import {utxos} from './fixtures';
import getKomodoRewards from '..';

function consensusMacro(t, utxo) {
	const rewards = getKomodoRewards(utxo);
	t.is(rewards, utxo.komododRewards);
}

consensusMacro.title = (_, {id}) => `Test getKomodoRewards() against komodod for UTXO ${id}`;

utxos.forEach(utxo => test(consensusMacro, utxo));
