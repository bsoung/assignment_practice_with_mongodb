db.product.insert({
	name: "Hammer",
	price: 9.99,
	department: "Hardware",
	color: "red",
	sales: 80,
	stock: 50
});

db.product.insert([
	{
		name: "Screwdriver",
		price: 19.99,
		department: "Hardware",
		color: "green",
		sales: 75,
		stock: 50
	},
	{
		name: "Wrench",
		price: 21.99,
		department: "Hardware",
		color: "orange",
		sales: 70,
		stock: 50
	}
]);

// Change the department of all products in the "Hardware" department to "Hardware Tools"

db.product.update(
	{ department: "Hardware" },
	{ $set: { department: "Hardware Tools" } },
	{ multi: true }
);

// Change the price of all products in the "Hardware Tools" department to cost $10 more than their current price

db.product.update(
	{ department: "Hardware Tools" },
	{ $inc: { price: 10 } },
	{ multi: true }
);

// Update the sales of all the products in the "Hardware Tools" department to be at least 50

db.product.update(
	{ department: "Hardware Tools" },
	{ $max: { sales: 50 } },
	{ multi: true }
);

db.product.update(
	{ department: "Hardware Tools" },
	{ $set: { department: "Hardware" } },
	{ multi: true }
);

db.product.update(
	{ department: "Hardware" },
	{ $inc: { price: -10 } },
	{ multi: true }
);

db.product.update(
	{ department: "Hardware" },
	{ $min: { sales: 10 } },
	{ multi: true }
);

db.product.update({ department: "Hardware" }, { $inc: { sale: 1 } });

db.product.remove({ department: "Hardware" }, { justOne: true });

db.product.remove({ department: "Hardware" });

db.product.find({ stock: 0 }, { _id: 0, name: 1 });

db.product.find({ $where: "this.price < 100" }, { _id: 0, stock: 1 });

db.product.find(
	{ $where: "this.price >= 100 && this.price <= 1000" },
	{ _id: 0, name: 1, color: 1, department: 1 }
);

db.product.find({ $where: "this.color === 'indigo'" }, { _id: 0, name: 1 });

db.product.find(
	{ $where: "this.color === 'red' || this.color === 'blue'" },
	{ _id: 1 }
);

db.product.find(
	{ $where: "this.color !== 'red' || this.color !== 'blue'" },
	{ _id: 0, name: 1 }
);

db.product.find(
	{ $where: "this.department !== 'Sports' || this.department !== 'Games'" },
	{ _id: 0, name: 1 }
);

db.product.find(
	{ $where: "this.department !== 'Sports' || this.department !== 'Games'" },
	{ _id: 0, name: 1 }
);

db.product.find(
	{
		$and: [
			{ name: { $regex: /^F/, $options: "i" } },
			{ name: { $regex: /S$/, $options: "i" } }
		]
	},
	{ _id: 0, name: 1, price: 1 }
);

db.product.find({ $where: "this.name[0] === 'T'" }, { _id: 0, name: 1 });

db.product.find(
	{ $where: "this.name[0] === 'F' || this.name[this.name.length - 1] === 's'" },
	{ _id: 0, name: 1 }
);

db.product.find(
	{ $where: "this.name[0] === 'T' && this.price < 100" },
	{ _id: 0, name: 1 }
);

db.product.find(
	{
		$where:
			"(this.name[0] === 'A' && this.price >= 100) || (this.name[0] === 'B' && this.price <= 100)"
	},
	{ _id: 0, name: 1 }
);

db.product.aggregate([
	{
		$group: { _id: "$department", total: { $sum: "$sales" } }
	},
	{
		$sort: { _id: 1 }
	}
]);

db.product.aggregate([
	{
		$match: { price: { $gte: 100 } }
	},
	{
		$group: { _id: "$department", total: { $sum: "$sales" } }
	},
	{
		$sort: { _id: 1 }
	}
]);

db.product.aggregate([
	{
		$match: { stock: 0 }
	},
	{
		$group: { _id: "$department", count: { $sum: 1 } }
	},
	{
		$sort: { _id: 1 }
	}
]);

// must reform due to prettier
db.product
	.mapReduce(
		function() {
			emit(this.color, 1);
		},
		function(key, values) {
			return Array.sum(values);
		},
		{
			query: {},
			out: "colors"
		}
	)
	.find();

// db.product.mapReduce(
// 		function() {
// 			emit(this.department, this.sales);
// 		},
// 		function(key, values) {
// 			return Array.sum(values);
// 		},
// 		{
// 			query: {},
// 			out: "colors"
// 		}
// 	).find();
