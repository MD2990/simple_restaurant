import { proxy, useSnapshot } from 'valtio';
import dataArray from '../data';

const state = proxy({
	data: dataArray,
	bill: [],
	totalAmount: 0,
});

export default state;
