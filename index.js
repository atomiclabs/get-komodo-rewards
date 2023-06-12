const KOMODO_ENDOFERA = 7777777;
const LOCKTIME_THRESHOLD = 500000000;
const MIN_SATOSHIS = 1000000000;
const ONE_MONTH_CAP_HARDFORK = 1000000;
const ONE_HOUR = 60;
const ONE_MONTH = 31 * 24 * 60;
const ONE_YEAR = 365 * 24 * 60;
const DEVISOR = 10512000;
const N_S7_HARDFORK_HEIGHT = 3484958;

const getKomodoRewards = utxo => {
	// Validate types
	['tiptime', 'locktime', 'height', 'satoshis'].forEach(property => {
		if (typeof utxo[property] !== 'number') {
			throw new TypeError(`\`${property}\` option must be a number.`);
		}
	});

	// Destructure UTXO properties
	const {tiptime, locktime, height, satoshis} = utxo;

	// Calculate coinage
	const coinage = Math.floor((tiptime - locktime) / ONE_HOUR);

	// Return early if UTXO is not eligible for rewards
	if (
		(height >= KOMODO_ENDOFERA) ||
		(locktime < LOCKTIME_THRESHOLD) ||
		(satoshis < MIN_SATOSHIS) ||
		(coinage < ONE_HOUR) ||
		(!height)
	) {
		return 0;
	}

	// Cap reward periods
	const limit = (height >= ONE_MONTH_CAP_HARDFORK) ? ONE_MONTH : ONE_YEAR;
	let rewardPeriod = Math.min(coinage, limit);

	// The first hour of coinage should not accrue rewards
	rewardPeriod -= 59;

	// Calculate rewards
	let rewards = Math.floor(satoshis / DEVISOR) * rewardPeriod;

	// Vote-KIP0001 resulted in a reduction of the AUR from 5% to 0.01%
	// https://github.com/KomodoPlatform/kips/blob/main/kip-0001.mediawiki
	// https://github.com/KomodoPlatform/komodo/pull/584
	if (height >= N_S7_HARDFORK_HEIGHT) {
		rewards = Math.floor(rewards / 500);
	}

	// Ensure reward value is never negative
	if (rewards < 0) {
		throw new Error('Reward should never be negative');
	}

	return rewards;
};

module.exports = getKomodoRewards;
