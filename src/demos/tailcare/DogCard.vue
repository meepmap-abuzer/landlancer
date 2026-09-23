<script setup lang="ts">
import { computed } from "vue";

const categoryLabels={home_search:"Ищет дом",missed:"Потерялся",found:"Найден"};
type CardSummary={id:number;name:string;category:"home_search"|"missed"|"found";preview_photo:{url:string};city:{name:string}};


const props = withDefaults(
  defineProps<{
    card: CardSummary;
    canModerate?: boolean;
    isDeleting?: boolean;
  }>(),
  {
    canModerate: false,
    isDeleting: false
  }
);

const emit = defineEmits<{
  "delete-card": [card: CardSummary];
  "select": [card: CardSummary];
}>();

const statusClass = computed(() => `dog-card__status--${props.card.category}`);

const publishedTime = computed(() => {
  if (props.card.category === "found") {
    return "Вчера, 18:02";
  }

  if (props.card.category === "missed") {
    return "Вчера, 21:47";
  }

  return props.card.id % 2 === 0 ? "Сегодня, 09:15" : "Сегодня, 10:23";
});

function openCard(): void {
  emit("select", props.card);
}

function requestDelete(): void {
  emit("delete-card", props.card);
}
</script>

<template>
  <article class="dog-card" role="button" tabindex="0" @click="openCard" @keydown.enter="openCard" @keydown.space.prevent="openCard">
    <button
      v-if="canModerate"
      class="moderation-trash-button moderation-trash-button--card"
      type="button"
      :disabled="isDeleting"
      :aria-label="`Удалить карточку ${card.name}`"
      title="Удалить карточку"
      @click.stop="requestDelete"
      @keydown.enter.stop
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h16" />
        <path d="M10 11v6M14 11v6" />
        <path d="M6 7l1 14h10l1-14" />
        <path d="M9 7V4h6v3" />
      </svg>
    </button>

    <div class="dog-card__image">
      <img
        v-if="card.preview_photo"
        :src="card.preview_photo.url"
        :alt="card.name"
        loading="lazy"
      />
      <div v-else class="dog-card__placeholder" aria-hidden="true" />
    </div>

    <div class="dog-card__body">
      <div class="dog-card__topline">
        <h3>{{ card.name }}</h3>
        <span class="dog-card__status" :class="statusClass">
          {{ categoryLabels[card.category] }}
        </span>
      </div>

      <div class="dog-card__meta">
        <span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          {{ card.city.name }}
        </span>
      </div>

      <div class="dog-card__meta dog-card__meta--time">
        <span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 8v4l3 2" />
          </svg>
          {{ publishedTime }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.dog-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 7px;
  background: var(--surface);
  box-shadow: 0 8px 20px rgba(25, 34, 29, 0.04);
  cursor: pointer;
  transition:
    transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

.moderation-trash-button {
  display: inline-grid;
  place-items: center;
  border: 0;
  border-radius: 999px;
  color: #9a251f;
  background: #fff1ef;
  cursor: pointer;
  transition:
    color 180ms cubic-bezier(0.16, 1, 0.3, 1),
    background 180ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

.moderation-trash-button:hover {
  color: #fff;
  background: #c7352d;
  transform: translateY(-1px);
}

.moderation-trash-button:disabled {
  cursor: wait;
  opacity: 0.55;
}

.moderation-trash-button svg {
  width: 18px;
  height: 18px;
}

.moderation-trash-button--card {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
  width: 38px;
  height: 38px;
  box-shadow: 0 10px 22px rgba(116, 28, 23, 0.16);
}

.dog-card:hover {
  box-shadow: var(--shadow-card);
  transform: translateY(-3px);
}

.dog-card__image {
  position: relative;
  height: 176px;
  overflow: hidden;
  background: #e9eee9;
}

.dog-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
}

.dog-card:hover .dog-card__image img {
  transform: scale(1.035);
}

.dog-card__placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e3ece5, #f7f8f5);
}

.dog-card__body {
  padding: 16px 18px 18px;
}

.dog-card__topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.dog-card h3 {
  margin: 0;
  color: var(--ink);
  font-size: 1.48rem;
  line-height: 1.1;
  letter-spacing: -0.045em;
}

.dog-card__status {
  min-width: max-content;
  padding: 8px 16px;
  border-radius: 7px;
  font-size: 0.9rem;
  font-weight: 800;
}

.dog-card__status--home_search {
  color: #176231;
  background: #c9f4d4;
}

.dog-card__status--missed {
  color: #e21f18;
  background: var(--red-soft);
}

.dog-card__status--found {
  color: #36544e;
  background: #eaf2ef;
}

.dog-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;
  color: var(--muted);
  font-size: 0.96rem;
  min-width: 0;
}

.dog-card__meta span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.dog-card__meta svg {
  width: 19px;
  height: 19px;
  flex: 0 0 auto;
}

.dog-card__meta--time {
  justify-content: flex-start;
  margin-top: 10px;
}
</style>