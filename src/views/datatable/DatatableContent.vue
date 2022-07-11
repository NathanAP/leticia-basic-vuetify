<script setup>
import { useRoute } from "vue-router";
import { status } from "../../services/api/event/helper";

const route = useRoute();

const selectedStatus = ref(null);
const eventList = ref([]);

const isLoading = ref(false);

if (route.params) {
    const params = route.params;
    selectedStatus.value = status[params.dataToSearch];
}

async function findEvents() {
    isLoading.value = true;

    eventList.value = [];

    const response = await getEvents({ statusId: selectedStatus.value });
    if (response.status === 200) {
        for (const object of response.data.items) {
            const event = new Event(object);
            eventList.value.push(event);
        }
    }

    isLoading.value = false;
}

await findEvents();
</script>

<template></template>

<style scoped lang="scss"></style>
