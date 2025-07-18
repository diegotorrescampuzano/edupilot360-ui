<!-- src/views/admin/users/UserForm.vue -->

<template>
  <CCard class="mx-auto" style="max-width: 500px;">
    <CCardHeader>
      <!-- Shows "Crear usuario" or "Editar usuario" based on mode -->
      <strong>{{ isEditMode ? 'Editar usuario' : 'Crear usuario' }}</strong>
    </CCardHeader>
    <CCardBody>
      <CForm @submit.prevent="handleSubmit">
        <!-- Name input -->
        <CFormInput
          label="Nombre completo"
          v-model="form.name"
          :invalid="!!formErrors.name"
          :feedback="formErrors.name"
          required
        />

        <!-- Email input -->
        <CFormInput
          class="mt-3"
          type="email"
          label="Correo electrónico"
          v-model="form.email"
          :invalid="!!formErrors.email"
          :feedback="formErrors.email"
          required
        />

        <!-- Phone input -->
        <CFormInput
          class="mt-3"
          label="Teléfono"
          v-model="form.phone"
          :invalid="!!formErrors.phone"
          :feedback="formErrors.phone"
        />

        <!-- Address input -->
        <CFormInput
          class="mt-3"
          label="Dirección"
          v-model="form.address"
          :invalid="!!formErrors.address"
          :feedback="formErrors.address"
        />

        <!-- Status select -->
        <CFormSelect
          class="mt-3"
          label="Estado"
          v-model="form.status"
          :options="statusOptions"
          :invalid="!!formErrors.status"
          :feedback="formErrors.status"
        />

        <!-- Action buttons -->
        <div class="d-flex justify-content-end mt-4">
          <CButton type="button" color="secondary" variant="outline" class="me-2" @click="handleCancel">
            Cancelar
          </CButton>
          <CButton type="submit" color="primary">
            Guardar
          </CButton>
        </div>
      </CForm>
    </CCardBody>
  </CCard>
</template>

<script setup>
// Vue and CoreUI imports
import { ref, computed } from 'vue'
// Use 'emit' to send events to parent component/view
const emit = defineEmits(['save', 'cancel'])

// Props: user object enables edit mode if provided
const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
})

// Reactive form state, prefilled if editing
const form = ref({
  name: props.user?.name || '',
  email: props.user?.email || '',
  phone: props.user?.phone || '',
  address: props.user?.address || '',
  status: props.user?.status || 'active',
})

// Holds validation error messages
const formErrors = ref({})

// Options for the status dropdown
const statusOptions = [
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
]

// Computed property: true if in edit mode
const isEditMode = computed(() => !!props.user)

// Validate and emit save
function handleSubmit() {
  formErrors.value = {}

  // Basic front-end validation
  if (!form.value.name) formErrors.value.name = 'El nombre es requerido.'
  if (!form.value.email) formErrors.value.email = 'El correo es requerido.'
  if (!form.value.status) formErrors.value.status = 'El estado es requerido.'

  if (Object.keys(formErrors.value).length > 0) return

  // Emit 'save' event to parent (with full form data)
  emit('save', { ...form.value })
}

// Emit cancel event to parent (to close modal or navigate back)
function handleCancel() {
  emit('cancel')
}
</script>

<!--
  EXPLANATION:
  - All UI labels and user feedback are in Spanish for admins/end-users.
  - Code comments and function names are in English for development clarity.
  - Form supports both creation and editing of users (reuse as needed).
  - Emits 'save' with form data or 'cancel' for parent component/view to handle closing logic.
-->
