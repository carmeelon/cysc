<template>
	<!-- <div>
		<div>
			<el-row>
				<el-col :span="4">
					<el-select v-model="selectValue" placeholder="请选择测评项目" @change="selectChanged">
						<el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="4">
					<el-button type="info" @click="showTable">查询</el-button>
				</el-col>
			</el-row>

		</div>
		<div v-if="isShowTable">
			<el-table ref="singleTable" :data="tableData" style="width: 100%" height="600" highlight-current-row v-loading="loading">
				<el-table-column type="index" width="50">
				</el-table-column>
				<el-table-column property="ORG_NAME" label="单位">
				</el-table-column>
				<el-table-column property="USR_NAME" label="姓名">
				</el-table-column>
				<el-table-column property="USER_SCORE" label="分数项">
				</el-table-column>
				<el-table-column property="fs" label="票数">
				</el-table-column>
			</el-table>
		</div>
	</div> -->
<div>
	<h1>正在建设</h1>
</div>
</template>
<script>
	export default {
		name: 'Query',
		data() {
			return {
				tableData: [],
				selectData: [],
				selectValue: '',
				isShowTable: false,
				loading: false
			}

		},
		mounted() {
			//this.getSelectData();
		},
		methods: {
			//获取考核列表
			getSelectData() {
				let arrayData = [];
				let url = process.env.API_HOST + "/odata/v_config_project?$orderby=STARTTIME desc";
				//获取配置的考核信息
				this.$axios.get(url).then(res => {
					arrayData = res.data.value;
					//创建下拉列表数据
					for (var i = 0; i < arrayData.length; i++) {
						let arrayItem = new Object();
						arrayItem.label = arrayData[i].PROJECT_NAME + "   (" + new Date(arrayData[i].STARTTIME)
							.format("MM-dd") +
							"至" + new Date(arrayData[i].ENDTIME).format("MM-dd") + ")";
						arrayItem.value = arrayData[i].CONF_ID;
						this.selectData.push(arrayItem);
					}
				}).catch(error => {

				});
			},
			getTableData(selectvalue) {
				let url = process.env.API_HOST + "/odata/v_user_score?$filter=CONF_ID eq " + selectvalue;
				this.$axios.get(url).then(res => {
					this.tableData = res.data.value;
				}).catch(error => {

				})

			},
			selectChanged() {
				console.log(this.selectValue);
			},
			showTable() {
				this.loading = true;
				this.tableData = [];
				this.getTableData(this.selectValue);
				this.isShowTable = true;
				this.loading = false;
			}
		}

	}
</script>
<style scoped>
</style>