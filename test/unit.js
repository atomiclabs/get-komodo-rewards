import test from 'ava';
import {subMinutes, subYears} from 'date-fns';
import getKomodoRewards from '..';

const KOMODO_ENDOFERA = 7777777;
const LOCKTIME_THRESHOLD = 500000000;
const MIN_SATOSHIS = 1000000000;
const ONE_MONTH_CAP_HARDFORK = 1000000;
const ONE_HOUR = 60;
const ONE_MILLISECOND = 1000;

const tiptime = 1552455573;
const locktime = Math.floor(subMinutes(tiptime * ONE_MILLISECOND, ONE_HOUR).getTime() / ONE_MILLISECOND);
const height = ONE_MONTH_CAP_HARDFORK;
const satoshis = MIN_SATOSHIS;

test('getKomodoRewards() correctly calculates rewards', t => {
	const utxo = {
		tiptime,
		locktime,
		height,
		satoshis
	};

	t.is(95, getKomodoRewards(utxo));
});

test('getKomodoRewards() returns 0 if height == KOMODO_ENDOFERA', t => {
	const utxo = {
		tiptime,
		locktime,
		height: KOMODO_ENDOFERA,
		satoshis
	};

	t.is(0, getKomodoRewards(utxo));
});

test('getKomodoRewards() returns 0 if height > KOMODO_ENDOFERA', t => {
	const utxo = {
		tiptime,
		locktime,
		height: KOMODO_ENDOFERA + 1,
		satoshis
	};

	t.is(0, getKomodoRewards(utxo));
});

test('getKomodoRewards() returns 0 if locktime < LOCKTIME_THRESHOLD', t => {
	const utxo = {
		tiptime,
		locktime: LOCKTIME_THRESHOLD - 1,
		height,
		satoshis
	};

	t.is(0, getKomodoRewards(utxo));
});

test('getKomodoRewards() returns 0 if satoshis < MIN_SATOSHIS', t => {
	const utxo = {
		tiptime,
		locktime,
		height,
		satoshis: MIN_SATOSHIS - 1
	};

	t.is(0, getKomodoRewards(utxo));
});

test('getKomodoRewards() returns 0 if coinage < ONE_HOUR', t => {
	const utxo = {
		tiptime,
		locktime: Math.floor(subMinutes(tiptime * ONE_MILLISECOND, ONE_HOUR - 1).getTime() / ONE_MILLISECOND),
		height,
		satoshis
	};

	t.is(0, getKomodoRewards(utxo));
});

test('getKomodoRewards() returns 0 if height isn\'t set', t => {
	const utxo = {
		tiptime,
		locktime,
		height: 0,
		satoshis
	};

	t.is(0, getKomodoRewards(utxo));
});

test('getKomodoRewards() caps rewards to one year when height < ONE_MONTH_CAP_HARDFORK', t => {
	const utxo = {
		tiptime,
		locktime: Math.floor(subYears(tiptime * ONE_MILLISECOND, 1).getTime() / ONE_MILLISECOND),
		height: ONE_MONTH_CAP_HARDFORK - 1,
		satoshis
	};

	t.is(49926395, getKomodoRewards(utxo));
});

test('getKomodoRewards() caps rewards to one month when height == ONE_MONTH_CAP_HARDFORK', t => {
	const utxo = {
		tiptime,
		locktime: Math.floor(subYears(tiptime * ONE_MILLISECOND, 1).getTime() / ONE_MILLISECOND),
		height: ONE_MONTH_CAP_HARDFORK,
		satoshis
	};

	t.is(4235195, getKomodoRewards(utxo));
});

test('getKomodoRewards() caps rewards to one month when height > ONE_MONTH_CAP_HARDFORK', t => {
	const utxo = {
		tiptime,
		locktime: Math.floor(subYears(tiptime * ONE_MILLISECOND, 1).getTime() / ONE_MILLISECOND),
		height: ONE_MONTH_CAP_HARDFORK + 1,
		satoshis
	};

	t.is(4235195, getKomodoRewards(utxo));
});
