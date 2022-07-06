<script setup>
import { ref } from "vue";
import MainButton from "../components/MainButton.vue";
import MainTextField from "../components/MainTextField.vue";

const startingDate = ref("");
const endingDate = ref("");

const actualButton = ref("");
const isLoading = ref(false);

function buttonFilter(buttonName) {
    //  TROCAR A LÓGICA DA COR PARA O DISABLED
    if (actualButton.value === buttonName) return;
    actualButton.value = buttonName;

    switch (buttonName) {
        case "expired-button": {
            console.log("Clicou no expired");
            break;
        }
        case "completed-button": {
            console.log("Clicou no completed");
            break;
        }
        case "in-course-button": {
            console.log("Clicou no in-course");
            break;
        }
        case "open-button": {
            console.log("Clicou no open");
            break;
        }
        case "summary-button": {
            console.log("Clicou no summary");
            break;
        }
    }
}
</script>

<template>
    <v-container class="main-content">
        <v-row>
            <v-col cols="12">
                <span class="main-title"> Dados gerenciais </span>
            </v-col>
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <span class="indicator-title">
                            Indicador de período
                        </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2">
                        <MainTextField
                            v-model="startingDate"
                            name="starting-date"
                            label="Data início"
                            placeholder="01/01/2022"
                            :disabled="isLoading"
                        />
                    </v-col>
                    <v-col cols="2">
                        <MainTextField
                            v-model="endingDate"
                            name="ending-date"
                            label="Data fim"
                            placeholder="01/01/2022"
                            :disabled="isLoading"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-container class="container-button-session">
                            <v-row>
                                <v-col offset="1" cols="2">
                                    <MainButton
                                        name="expired-button"
                                        label="Expiradas"
                                        class="button-session"
                                        :color="
                                            actualButton === 'expired-button'
                                                ? 'grey'
                                                : 'blue'
                                        "
                                        :disable="isLoading"
                                        :callback="
                                            () => {
                                                buttonFilter('expired-button');
                                            }
                                        "
                                    />
                                </v-col>
                                <v-col cols="2">
                                    <MainButton
                                        name="completed-button"
                                        label="Concluídas"
                                        class="button-session"
                                        :color="
                                            actualButton === 'completed-button'
                                                ? 'grey'
                                                : 'green'
                                        "
                                        :disable="isLoading"
                                        :callback="
                                            () => {
                                                buttonFilter(
                                                    'completed-button'
                                                );
                                            }
                                        "
                                    />
                                </v-col>
                                <v-col cols="2">
                                    <MainButton
                                        name="in-course-button"
                                        label="Em andamento"
                                        class="button-session"
                                        :color="
                                            actualButton === 'in-course-button'
                                                ? 'grey'
                                                : 'yellow'
                                        "
                                        :disable="isLoading"
                                        :callback="
                                            () => {
                                                buttonFilter(
                                                    'in-course-button'
                                                );
                                            }
                                        "
                                    />
                                </v-col>
                                <v-col cols="2">
                                    <MainButton
                                        name="open-button"
                                        label="Em aberto"
                                        class="button-session"
                                        :color="
                                            actualButton === 'open-button'
                                                ? 'grey'
                                                : 'red'
                                        "
                                        :disable="isLoading"
                                        :callback="
                                            () => {
                                                buttonFilter('open-button');
                                            }
                                        "
                                    />
                                </v-col>
                                <v-col cols="2">
                                    <MainButton
                                        name="summary-button"
                                        label="Resumo"
                                        class="button-session"
                                        :color="
                                            actualButton === 'summary-button'
                                                ? 'grey'
                                                : 'purple'
                                        "
                                        :disable="isLoading"
                                        :callback="
                                            () => {
                                                buttonFilter('summary-button');
                                            }
                                        "
                                    />
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                </v-row>
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

.indicator-title {
    font-size: 1.125rem;
}

.container-button-session {
    background-color: #cccccc;
}
</style>
