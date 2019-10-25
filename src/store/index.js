import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [new VuexPersistence().plugin],
	state: {
		items: [],
		newItem: {
			name: "",
			cost: null,
			category: null,
			desc: "",
			isIncome: false
		},
		totalExpense: null,
		totalIncome: null,
		incomes: []
	},
	getters: {
		balance: state => {
			return state.totalIncome - state.totalExpense;
		},
		incomes: state => {
			return state.items.filter(i => i.isIncome);
		},
		totalIncome: state => {
			return state.incomes.reduce((currentTotal, item) => {
				return item.cost + currentTotal;
			}, 0);
		},
		totalExpense: state => {
			return state.items.reduce((currentTotal, item) => {
				return item.cost + currentTotal;
			}, 0);
		}
	},
	mutations: {
		addItem(state) {
			state.items.push(state.newItem);
		}
	},
	actions: {
		increment(context) {
			context.commit("increment");
		}
	}
});
