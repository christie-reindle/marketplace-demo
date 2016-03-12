<template>
  <div>
    <a v-link="{ name: 'create_space' }" class="button is-success">
      Create new space
    </a>
    <hr>
    <table class="table is-striped is-narrow">
      <thead>
        <th>
          Name
        </th>
        <th>
          Address
        </th>
        <th>
          Actions
        </th>
      </thead>
      <tbody v-if="spaces.length > 0">
        <tr v-for="space in spaces" track-by="$index">
          <td>
            {{ space.name }}
          </td>
          <td>
            {{ space.address }}
          </td>
          <td>
            <a v-link="{ name: 'me_spaces_edit', params: { id: space.id } }" class="button is-small">
              Edit
            </a>
            <button class="button is-danger is-small" @click.prevent="deleteSpace($index)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Firebase from '../../services/Firebase'
import Auth from '../../services/Auth'

export default {
  data () {
    return {
      user: Auth.getUser(),
      spaces: []
    }
  },
  methods: {
    deleteSpace: function (index) {
      let space = this.spaces[index]
      Firebase.child('spaces/' + space.id).remove()
      .then(() => {
        this.splaces.splice(index, 1)
      })
    }
  },
  created: function () {
    let spacesRef = Firebase.child('spaces')

    spacesRef.orderByChild('owner').equalTo(this.user.uid).on('child_added', (data) => {
      let space = data.val()

      this.spaces.push({
        id: data.key(),
        name: space.name,
        address: space.location.address
      })
    })
  }
}
</script>
