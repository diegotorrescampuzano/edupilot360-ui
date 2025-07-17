<script setup>
import avatarDefault from '@/assets/images/avatars/3.jpg'
import { computed } from 'vue'

const props = defineProps({
  user: Object
})

const emit = defineEmits(['logout'])

// Computed para decidir qué imagen mostrar: foto de usuario o avatar por defecto
const avatarSrc = computed(() => {
  return props.user?.photoURL || avatarDefault
})
</script>

<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatarSrc" size="md">
        <!-- Solo muestra inicial si no hay foto ni avatar (protección extra) -->
        <template v-if="!props.user?.photoURL && !avatarSrc">
          {{ props.user?.email?.charAt(0) || '' }}
        </template>
      </CAvatar>
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top">
        Cuenta
      </CDropdownHeader>
      <CDropdownItem>{{ props.user?.email || 'Usuario' }}</CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem @click="$emit('logout')">
        <CIcon icon="cil-lock-locked" /> Cerrar sesión
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>
