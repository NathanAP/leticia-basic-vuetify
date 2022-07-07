<script setup>
import { ref, toRef, computed } from "vue";
import { Bar } from "vue-chartjs";

const props = defineProps({
    title: { type: String, required: true },
    labels: { type: Array, required: true },
    data: { type: Array, required: true },
    colors: { type: Array, default: ["green", "blue", "red", "yellow"] },
});

const data = toRef(props, "data");

const chartData = computed(() => ({
    labels: props.labels,
    datasets: [
        {
            label: props.labels[0],
            data: data.value,
            backgroundColor: props.colors,
        },
    ],
}));

const chartOptions = ref({
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: props.title,
        },
    },
});
</script>

<template>
    <Bar :chart-options="chartOptions" :chart-data="chartData" />
</template>

<style scoped lang="scss"></style>
