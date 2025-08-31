<template>
  <UCard class="text-center overflow-hidden rounded-xl shadow-md cursor-pointer" :ui="{ 'body': 'p-0 sm:p-0' }">
    <USkeleton class="h-3 rounded-none" />
    <div class="p-4 w-full">
      <div class="py-8">
        <USkeleton class="h-5 w-[150px] mx-auto" />
      </div>
      <div class="py-5 flex flex-col">
        <USkeleton class="h-2 w-[80px] mx-auto" />
        <USkeleton class="h-5 my-5  w-[180px] mx-auto" />
        <USkeleton class="h-2 w-[50px] mx-auto" />
      </div>
    </div>
  </UCard>
</template>
