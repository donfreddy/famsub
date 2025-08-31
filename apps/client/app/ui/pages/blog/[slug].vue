<template>
<div class="pt-32">
  <ContentRenderer :value='post ?? {}'>

    <div class="">
      <h1 class='text-xl font-bold text-fgColor sm:text-2xl md:text-4xl'>{{ post?.title }}</h1>
      <!-- content -->
      <article
          class='py-4 prose-sm prose-hub prose max-w-none md:prose-base prose-img:rounded-md'>
        <ContentRendererMarkdown :value='post ?? {}'/>
      </article>
    </div>

    <template #empty>
      <p>No content found.</p>
    </template>
  </ContentRenderer>
</div>
</template>

<script setup lang="ts">
const {params} = useRoute();

const {data: post} = await useAsyncData(async () => {
  const keys: string[] = ['title', 'slug', 'description', 'body'];
  return await queryCollection('')
      .where({slug: params.slug?.toString()})
      .findOne();
});
</script>
