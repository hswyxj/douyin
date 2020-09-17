'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('douyin-test')
	const res = await collection.limit(10).get()
	return res
};
