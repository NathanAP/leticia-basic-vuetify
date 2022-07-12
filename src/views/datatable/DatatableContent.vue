<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { status } from "../../services/api/event/helper";
import Event from "../../services/api/event/model";

console.log(2);

const route = useRoute();

const selectedStatus = ref(null);
const eventList = ref([]);
const equipmentList = ref([]);
const priorityList = ref([]);
const eventTypeList = ref([]);

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

    if (equipmentList.value.length === 0) await findEquipments();
    if (priorityList.value.length === 0) await findPriorities();
    if (eventTypeList.value.length === 0) await findEventType();

    isLoading.value = false;
}

async function findEquipments() {}
async function findPriorities() {}
async function findEventType() {}

// await findEvents();
</script>

<template>
    <v-container class="main-content">
        <v-row>
            <v-col cols="12">
                <span class="main-title"> Ocorrências em aberto </span>
            </v-col>
            <v-col cols="12">
                <v-table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Data</th>
                            <th>Equipamento</th>
                            <th>Status</th>
                            <th>Prioridade</th>
                            <th>Tipo de ocorrência</th>
                            <th>Responsável</th>
                            <th>Notificar cliente</th>
                            <th>Ocorrência</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="event in eventList" :key="event.id">
                            <td>{{ event.id }}</td>
                            <td>{{ event.data }}</td>
                            <td>{{ event.equipamentId }}</td>
                            <td>{{ event.statusId }}</td>
                            <td>{{ event.priorityId }}</td>
                            <td>{{ event.responsable }}</td>
                            <td>{{ event.notify ? "Sim" : "Não" }}</td>
                            <td>{{ event.text }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped lang="scss">
.main-content {
    background-color: #ececec;
    padding: 1.5rem;
}

.main-title {
    font-size: 1.5rem;
    font-weight: 600;
}
</style>
