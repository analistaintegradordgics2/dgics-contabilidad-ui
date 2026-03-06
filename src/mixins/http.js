import axios from "axios"
import { forEach } from "lodash"

export default {
  methods: {

    async Get(api, params = {}) {
      try {
        const { data } = await axios(`${api}/`, { params })
        return data
      } catch (error) {
        throw error
      }
    },

    async Post(api, model) {
      try {
        const { data } = await axios.post(`${api}/`, model)
        return data
      } catch (error) {
        throw error
      }
    },

    async PostNew(api, model) {
      try {
        const { data } = await axios.post(`${api}`, model)
        return data
      } catch (error) {
        throw error
      }
    },

    async PostDownload(api, model) {
      try {
        const { data } = await axios({
          method: "post",
          url: `${api}/`,
          data: model,
          responseType: "blob"
        })
        return data
      } catch (error) {
        throw error
      }
    },

    async PostFile(api, model) {
      try {
        const formData = new FormData()

        forEach(model, function(value, key) {
          formData.append(key, value)
        })

        const { data } = await axios.post(`${api}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })

        return data
      } catch (error) {
        throw error
      }
    },

    async Put(api, model) {
      try {
        const { data } = await axios.put(`${api}/`, model)
        return data
      } catch (error) {
        throw error
      }
    },

    async PutFile(api, model) {
      try {
        const formData = new FormData()

        forEach(model, function(value, key) {
          formData.append(key, value)
        })

        const { data } = await axios.put(`${api}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })

        return data
      } catch (error) {
        throw error
      }
    },

    async Patch(api, model) {
      try {
        const { data } = await axios.patch(`${api}/`, model)
        return data
      } catch (error) {
        throw error
      }
    },

    async PatchFile(api, model) {
      try {
        const formData = new FormData()

        forEach(model, function(value, key) {
          formData.append(key, value)
        })

        const { data } = await axios.patch(`${api}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })

        return data
      } catch (error) {
        throw error
      }
    },

    async Delete(api) {
      try {
        const { data } = await axios.delete(`${api}/`)
        return data
      } catch (error) {
        throw error
      }
    },

    async view_pdf(api, method, model = null) {
      let params = {
        url: `${api}/`,
        method: method,
        responseType: "blob"
      }

      if (model != null) {
        params["data"] = model
      }

      try {
        const { data } = await axios(params)

        const url = window.URL.createObjectURL(
          new Blob([data], { type: "application/pdf" })
        )

        return url

      } catch (error) {
        throw error
      }
    }

  }
}