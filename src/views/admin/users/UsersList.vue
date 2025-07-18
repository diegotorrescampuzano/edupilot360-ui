<!-- src/views/admin/users/UsersList.vue -->

<template>
  <!-- Toolbar: section title and "Crear usuario" button -->
  <CRow class="mb-4 align-items-center">
    <CCol>
      <h3 class="mb-0">Usuarios</h3>
    </CCol>
    <CCol class="text-end">
      <CButton color="primary" @click="openUserForm">
        Crear usuario
      </CButton>
    </CCol>
  </CRow>

  <!-- Filters: search and status filter aligned horizontally and visually consistent -->
  <CRow class="mb-3 align-items-end">
    <!-- Search field with explicit label -->
    <CCol md="4">
      <CFormInput
        v-model="filters.query"
        label="Buscar"
        placeholder="Por nombre o correo"
        @keyup.enter="fetchUsers"
      />
    </CCol>
    <!-- Status dropdown with label for consistent alignment -->
    <CCol md="3">
      <CFormSelect
        v-model="filters.status"
        label="Estado"
        :options="statusOptions"
        @change="fetchUsers"
      />
    </CCol>
    <!-- Clear filters button aligned with inputs -->
    <CCol md="2" class="d-flex align-items-end">
      <CButton color="secondary" variant="outline" @click="clearFilters">
        Limpiar filtros
      </CButton>
    </CCol>
  </CRow>

  <!-- User table: responsive and interactive -->
  <CRow>
    <CCol>
      <CTable hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Nombre</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Teléfono</CTableHeaderCell>
            <CTableHeaderCell>Dirección</CTableHeaderCell>
            <CTableHeaderCell>Estado</CTableHeaderCell>
            <CTableHeaderCell>Acciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow v-for="user in users" :key="user.firebaseUid">
            <CTableDataCell>{{ user.name }}</CTableDataCell>
            <CTableDataCell>{{ user.email }}</CTableDataCell>
            <CTableDataCell>{{ user.phone }}</CTableDataCell>
            <CTableDataCell>{{ user.address }}</CTableDataCell>
            <CTableDataCell>
              <CBadge :color="user.status === 'active' ? 'success' : 'secondary'">
                {{ user.status === 'active' ? 'Activo' : 'Inactivo' }}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell>
              <CButton size="sm" color="info" variant="outline" @click="viewUser(user)">
                Ver
              </CButton>
              <CButton size="sm" color="secondary" variant="outline" @click="editUser(user)" class="ms-2">
                Editar
              </CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow v-if="users.length === 0">
            <CTableDataCell colspan="6" class="text-center text-muted">
              No se encontraron usuarios.
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CCol>
  </CRow>

  <!-- Pagination controls if needed -->
  <CRow v-if="totalPages > 1" class="mt-3">
    <CCol class="text-center">
      <CPagination
        v-model="currentPage"
        :pages="totalPages"
        align="center"
        @update:modelValue="fetchUsers"
      />
    </CCol>
  </CRow>

  <!-- User creation/edit modal with balanced padding and visual separation -->
  <CModal :visible="showUserForm" @close="closeUserForm" alignment="center">
    <div class="pt-4 pb-4 px-4">
      <UserForm
        :user="selectedUser"
        @save="onUserSaved"
        @cancel="closeUserForm"
      />
    </div>
  </CModal>
</template>

<script setup>
// Import Vue and CoreUI components
import { ref } from 'vue'
import UserForm from './UserForm.vue'

// State variables for user list and UI
const users = ref([])       // Array holding user objects
const currentPage = ref(1)  // Current page (pagination)
const totalPages = ref(1)   // Total pages (pagination)
const filters = ref({
  query: '',
  status: '',
})
const statusOptions = [
  { value: '', label: 'Todos' },
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
]

// Modal and user editing state
const showUserForm = ref(false)
const selectedUser = ref(null) // null means create; object means edit

// Fetch users from API or store based on filters and pagination
function fetchUsers() {
  // TODO: Make an API/store request here, using filters.value and currentPage.value
  // users.value = ...; totalPages.value = ...
}

// Clear all filters, reset page and reload user list
function clearFilters() {
  filters.value = { query: '', status: '' }
  currentPage.value = 1
  fetchUsers()
}

// Open creation modal
function openUserForm() {
  selectedUser.value = null
  showUserForm.value = true
}

// Open editing modal for a specific user
function editUser(user) {
  selectedUser.value = { ...user }
  showUserForm.value = true
}

// Show user details (to implement)
function viewUser(user) {
  // TODO: Implement view details of selected user
}

// Close user modal
function closeUserForm() {
  showUserForm.value = false
}

// When user is created or edited, close modal and refresh list
function onUserSaved(userData) {
  closeUserForm()
  // TODO: Optionally refresh users from API
  fetchUsers()
}

// Optionally, fetch user list on mount
// import { onMounted } from 'vue'
// onMounted(fetchUsers)
</script>

<!--
  EXPLANATION:
  - Filters row now has both fields using labels (label="Buscar", label="Estado") for perfect visual alignment.
  - The button "Limpiar filtros" is baseline-aligned via 'align-items-end' and d-flex.
  - Modal for user creation/edition uses extra padding for a balanced, professional look.
  - All user-facing labels remain in Spanish for clarity; all comments and logic in English.
-->
