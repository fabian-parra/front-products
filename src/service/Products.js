const fetchProductId = search => fetch(`http://localhost:8882/bff/get-products?id=${search}`)
                                 .then(response => response.json())

const fetchProductMatch = search => fetch(`http://localhost:8882/bff/get-products?match=${search}`)
                                 .then(response => response.json())

export default {fetchProductId, fetchProductMatch}
