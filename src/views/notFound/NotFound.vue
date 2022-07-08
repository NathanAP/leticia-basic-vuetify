<script setup></script>

<template>
    <Suspense>
        <template #default>
            <div class="main-content">
                <RouterView />
            </div>
        </template>
    </Suspense>
</template>

<style lang="scss">
.main-content {
    height: 100%;
}
</style>
