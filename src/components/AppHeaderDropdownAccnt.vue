<script setup>
import avatar from '@/assets/images/avatars/3.jpg'
import { computed } from 'vue'
const props = defineProps(['user'])
const emit = defineEmits(['logout'])
</script>
<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <!-- Muestra el avatar si tienes, o iniciales -->
      <CAvatar :src="user?.photoURL" size="md">
        <template v-if="!user?.photoURL">{{ user?.email?.charAt(0) }}</template>
      </CAvatar>
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top">
        Cuenta
      </CDropdownHeader>
      <CDropdownItem>{{ user?.email }}</CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem @click="$emit('logout')">
        <CIcon icon="cil-lock-locked" /> Cerrar sesión
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>
