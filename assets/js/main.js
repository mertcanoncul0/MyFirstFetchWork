const postUserTemp = qs('[data-post-card]')
const postsContainer = qs('[data-posts]')
const userDetailTemp = qs('[data-user-detail]')
const userCommentTemp = qs('[data-comment-detail]')
const userDetailDialog = qs('[data-user-detail-dialog]')
const commentDetailDialog = qs('[data-comment-detail-dialog]')

const getData = () => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((result) => {
      init(result)
    })
}

getData()

const removeElements = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
}

const renderUserDetail = (data) => {
  // Remove Elements
  removeElements(userDetailDialog)

  const userDetailTemplate = document.importNode(userDetailTemp.content, true)

  const fullName = qs('[data-full-name]', userDetailTemplate)
  const username = qs('[data-username]', userDetailTemplate)
  const userEmail = qs('[data-user-email]', userDetailTemplate)
  const userStreet = qs('[data-user-street]', userDetailTemplate)
  const userSuite = qs('[data-user-suite]', userDetailTemplate)
  const userCity = qs('[data-user-city]', userDetailTemplate)
  const userZipcode = qs('[data-user-zipcode]', userDetailTemplate)
  const userLat = qs('[data-user-lat]', userDetailTemplate)
  const userLng = qs('[data-user-lng]', userDetailTemplate)
  const userPhone = qs('[data-user-phone]', userDetailTemplate)
  const userWebsite = qs('[data-user-website]', userDetailTemplate)
  const userCompanyName = qs('[data-user-company-name]', userDetailTemplate)
  const userCompanyCatch = qs('[data-user-company-catch]', userDetailTemplate)
  const userCompanyBs = qs('[data-user-company-bs]', userDetailTemplate)

  fullName.innerHTML = `<strong>name:</strong> ${data.name}`
  username.innerHTML = `<strong>username:</strong> ${data.username}`
  userEmail.innerHTML = `<strong>email:</strong> ${data.email}`
  userPhone.innerHTML = `<strong>phone:</strong> ${data.phone}`
  userWebsite.innerHTML = `<strong>website:</strong> ${data.website}`
  userStreet.innerHTML = `<strong>street:</strong> ${data.address.street}`
  userSuite.innerHTML = `<strong>suite:</strong> ${data.address.suite}`
  userCity.innerHTML = `<strong>city:</strong> ${data.address.city}`
  userZipcode.innerHTML = `<strong>zipcode:</strong> ${data.address.zipcode}`
  userLat.innerHTML = `<strong>lat:</strong> ${data.address.geo.lat}`
  userLng.innerHTML = `<strong>lng:</strong> ${data.address.geo.lng}`
  userCompanyName.innerHTML = `<strong>name:</strong> ${data.company.name}`
  userCompanyCatch.innerHTML = `<strong>catchPhrase:</strong> ${data.company.catchPhrase}`
  userCompanyBs.innerHTML = `<strong>bs:</strong> ${data.company.bs}`

  userDetailDialog.appendChild(userDetailTemplate)
  userDetailDialog.showModal()
}

const getUserDetail = (userId) => {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((res) => res.json())
    .then((result) => {
      renderUserDetail(result)
    })
}

const renderCommentDetail = (datas) => {
  removeElements(commentDetailDialog)
  datas.forEach((data) => {
    const userCommentTemplate = document.importNode(
      userCommentTemp.content,
      true
    )

    const commentPostName = qs('[data-comment-post-name]', userCommentTemplate)
    const commentEmail = qs('[data-comment-email]', userCommentTemplate)
    const commentComment = qs('[data-comment-comment]', userCommentTemplate)

    commentPostName.innerHTML = `<strong class="comment-detail-head">name:</strong> ${data.name}`
    commentEmail.innerHTML = `<strong class="comment-detail-head">sender email:</strong> ${data.email}`
    commentComment.innerHTML = `<strong class="comment-detail-head">comment:</strong> ${data.body}`

    commentDetailDialog.appendChild(userCommentTemplate)
    commentDetailDialog.showModal()
  })
}

const getComments = (id) => {
  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
    .then((res) => res.json())
    .then((result) => {
      renderCommentDetail(result)
    })
}

const renderPosts = (datas) => {
  datas.forEach((data) => {
    const postUserTemplate = document.importNode(postUserTemp.content, true)
    const postTitle = qs('h4', postUserTemplate)
    const postDesc = qs('p', postUserTemplate)
    const userIcon = qs('.user-placeholder', postUserTemplate)
    const commentsIcon = qs('.post-comments', postUserTemplate)

    userIcon.addEventListener('click', () => getUserDetail(data.userId))
    commentsIcon.addEventListener('click', () => getComments(data.id))

    postTitle.innerText = data.title
    postDesc.innerText = data.body

    postsContainer.appendChild(postUserTemplate)
  })
}

const init = (datas) => {
  renderPosts(datas)
}
