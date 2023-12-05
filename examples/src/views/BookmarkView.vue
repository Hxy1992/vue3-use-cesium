<template>
	<div class="bbox">
		<div id="my-map" class="content-box"></div>
		<div class="btn-box">
			<div class="description">
				场景书签，可保存当前相机的位置和姿态
			</div>
			<div>
				<button @click="clearBook">清空书签</button>
			</div>
			<div>
				<input type="text" v-model="bookName">
				<button @click="addBook">添加</button>
			</div>
			<div>
				时间/s<input type="number" v-model="flyDuration">
			</div>
			<div style="margin: 8px 0;">
				场景书签列表：
			</div>
			<table border="1">
				<thead>
					<th>书签名称</th>
					<th>操作</th>
				</thead>
				<tbody>
					<tr v-for="item in bookList" :key="item.id">
						<td>{{ item.name }}</td>
						<td>
							<button @click="flyTo(item.id)">定位</button>
							<button @click="removeBook(item.id)">删除</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useBaseMap } from "../hooks/useBaseMap";
import { onBeforeUnmount, ref } from "vue";
import { BookMark } from "@zhdgps/vue3-use-cesium";

const bookList = ref<any[]>([]);
const bookName = ref("");
const flyDuration = ref(1.5);
let bookmark: BookMark | null;

function updateBookList() {
	bookList.value = bookmark?.listAll() || [];
}

// 新增书签
function addBook() {
	bookmark?.add(bookName.value);
	updateBookList();
}
// 新增书签
function removeBook(id: string) {
	bookmark?.remove(id);
	updateBookList();
}
// 新增书签
function clearBook() {
	bookmark?.clear();
	bookList.value = [];
}
// 书签定位
function flyTo(id: string) {
	bookmark?.flyTo(id, flyDuration.value)
}

// 地图初始化
useBaseMap("#my-map", v => {
	bookmark = new BookMark();
	updateBookList();
});


onBeforeUnmount(async () => {
});
</script>

<style scoped>
.bbox,
.content-box {
	width: 100%;
	height: 100%;
}

ul {
	margin: 5px 0;
}

.btn-box {
	position: absolute;
	top: 10px;
	left: 10px;
	padding: 16px;
	color: white;
	background-color: rgb(9 16 59 / 85%);
	border-radius: 5px;
}

.btn-box li {
	list-style-type: none;
}

.btn-box button {
	margin: 2px 0;
	cursor: pointer;
}

.btn-box button[selected=true] {
	color: white;
	background-color: #4064e2;
}

.btn-box .description {
	margin-bottom: 8px;
	font-size: 12px;
}
</style>
