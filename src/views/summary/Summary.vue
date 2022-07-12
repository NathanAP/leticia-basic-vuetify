<script setup></script>

<template>
    <Suspense>
        <template #default>
            <div class="main-content">
                <RouterView />
            </div>
        </template>
        <template #fallback>
            <div>
                <span> Loading ... </span>
            </div>
        </template>
    </Suspense>
</template>

<style scoped lang="scss">
.main-content {
    height: 100%;
}
</style>
