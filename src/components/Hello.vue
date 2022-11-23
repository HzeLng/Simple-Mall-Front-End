<template>
    <div>
        <h1>hi, {{name}}</h1>
        <el-radio-group v-model="radio">
            <el-radio :label="3">备选项</el-radio>
            <el-radio :label="6">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
        </el-radio-group>
    </div>
    
</template>
<script>
export default {
    data() {
        return {
            name: "张三"
        }
    }
}

</script>