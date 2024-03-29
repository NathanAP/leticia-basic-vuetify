<script setup>
import moment from "moment";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { status, statusKeys } from "../../services/api/event/helper";
import Equipment from "../../services/api/equipment/model";
import { getAllEquipments } from "../../services/api/equipment/request";
import Event from "../../services/api/event/model";
import { getAllEvents } from "../../services/api/event/request";
import EventType from "../../services/api/eventType/model";
import { getEventTypes } from "../../services/api/eventType/request";

const route = useRoute();
const router = useRouter();
const { t } = useI18n({ useScope: "global" });

const title = ref("");
const selectedStatus = ref(null);
const eventList = ref([]);
const equipmentList = ref([]);
const eventTypeList = ref([]);

const startingDate = ref("");
const endingDate = ref("");

const isLoading = ref(false);

console.log(route.params);
if (route.params) {
    const params = route.params;

    startingDate.value = params.startingDate;
    endingDate.value = params.endingDate;

    selectedStatus.value = status[params.dataToSearch];

    switch (selectedStatus.value) {
        case 0: {
            title.value = "Occorrências em aberto";
            break;
        }
        case 1: {
            title.value = "Occorrências completadas";
            break;
        }
        case 2: {
            title.value = "Occorrências em andamento";
            break;
        }
        case 3: {
            title.value = "Occorrências expiradas";
            break;
        }
        default: {
            title.value = "Todas as ocorrências";
            selectedStatus.value = -1;
            break;
        }
    }

    await findEvents();
}

async function findEvents() {
    isLoading.value = true;

    eventList.value = [];

    const query = {};
    if (startingDate.value) query.startingDate = startingDate.value;
    if (endingDate.value) query.endingDate = endingDate.value;

    const response = await getAllEvents(query);

    if (Array.isArray(response) && response.length > 0) {
        if (response) {
            for (const object of response) {
                const event = new Event(object);
                if (
                    selectedStatus.value === -1 ||
                    selectedStatus.value === event.statusId
                )
                    eventList.value.push(event);
            }
        }
    }

    if (equipmentList.value.length === 0) await findEquipments();
    if (eventTypeList.value.length === 0) await findEventType();

    isLoading.value = false;
}

async function findEquipments() {
    isLoading.value = true;

    equipmentList.value = [];

    const response = await getAllEquipments();

    if (Array.isArray(response) && response.length > 0) {
        for (const object of response) {
            const type = new Equipment(object);
            equipmentList.value.push(type);
        }
    }

    isLoading.value = false;
}

async function findEventType() {
    isLoading.value = true;

    eventTypeList.value = [];

    const response = await getEventTypes();
    if (response.items) {
        for (const object of response.items) {
            const type = new EventType(object);
            eventTypeList.value.push(type);
        }
    }

    isLoading.value = false;
}
</script>

<template>
    <v-container class="main-content">
        <v-row>
            <v-col cols="12">
                <v-row>
                    <v-btn
                        icon="fas fa-arrow-left"
                        elevation="0"
                        color="transparent"
                        @click="
                            router.push({
                                name: 'dashboard',
                                params: {
                                    startingDate,
                                    endingDate,
                                },
                            })
                        "
                    ></v-btn>
                    <span class="main-title"> {{ title }} </span>
                </v-row>
            </v-col>
            <v-col cols="12">
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-header">#</th>
                            <th class="text-header">Data</th>
                            <th class="text-header">Equipamento</th>
                            <th class="text-header">Status</th>
                            <th class="text-header">Prioridade</th>
                            <th class="text-header">Tipo de ocorrência</th>
                            <th class="text-header">Responsável</th>
                            <th class="text-header">Notificar cliente</th>
                            <th class="text-header">Ocorrência</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="eventList.length === 0">
                            <td class="no-data text-center" colspan="9">
                                Não há dados
                            </td>
                        </tr>

                        <tr v-else v-for="event in eventList" :key="event.id">
                            <td>{{ event.id }}</td>
                            <td>
                                {{
                                    new moment(event.date).format("DD/MM/YYYY")
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        equipmentList.find(
                                            (equipment) =>
                                                equipment.id ===
                                                event.equipmentId
                                        ) || { name: "" }
                                    ).name
                                }}
                            </td>
                            <td>
                                {{
                                    t(
                                        `default.status.${statusKeys[
                                            event.statusId
                                        ].toLowerCase()}`
                                    )
                                }}
                            </td>
                            <td>
                                {{
                                    t(
                                        `default.priorities.${event.priority.toLowerCase()}`
                                    )
                                }}
                            </td>
                            <td>
                                {{
                                    (
                                        eventTypeList.find(
                                            (type) => type.id === event.typeId
                                        ) || { name: "" }
                                    ).name
                                }}
                            </td>
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
    padding-left: 1rem;
    font-size: 1.75rem;
    font-weight: 600;
}

.no-data {
    font-size: 2rem !important;
}

.text-header {
    font-size: 1rem !important;
    font-weight: 600;
}
</style>
