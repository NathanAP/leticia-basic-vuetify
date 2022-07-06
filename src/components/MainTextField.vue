<script setup>
import { computed } from "vue";

const props = defineProps({
    modelValue: { required: true },
    name: { type: String, required: true },
    label: { type: String, required: true },
    placeholder: { type: String },
    disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
</script>

<template>
    <v-text-field
        density="comfortable"
        variant="outlined"
        v-model="value"
        :name="props.name"
        :label="props.label"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
    >
    </v-text-field>
</template>

<style scoped lang="scss"></style>
