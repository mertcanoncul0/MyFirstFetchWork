const postUserTemp = document.querySelector('[data-post-card]')
const postsContainer = document.querySelector('[data-posts]')
const userDetailTemp = document.querySelector('[data-user-detail]')
const userCommentTemp = document.querySelector('[data-comment-detail]')
const userDetailDialog = document.querySelector('[data-user-detail-dialog]')
const commentDetailDialog = document.querySelector(
  '[data-comment-detail-dialog]'
)

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

  const fullName = userDetailTemplate.querySelector('[data-full-name]')
  const username = userDetailTemplate.querySelector('[data-username]')
  const userEmail = userDetailTemplate.querySelector('[data-user-email]')
  const userStreet = userDetailTemplate.querySelector('[data-user-street]')
  const userSuite = userDetailTemplate.querySelector('[data-user-suite]')
  const userCity = userDetailTemplate.querySelector('[data-user-city]')
  const userZipcode = userDetailTemplate.querySelector('[data-user-zipcode]')
  const userLat = userDetailTemplate.querySelector('[data-user-lat]')
  const userLng = userDetailTemplate.querySelector('[data-user-lng]')
  const userPhone = userDetailTemplate.querySelector('[data-user-phone]')
  const userWebsite = userDetailTemplate.querySelector('[data-user-website]')
  const userCompanyName = userDetailTemplate.querySelector(
    '[data-user-company-name]'
  )
  const userCompanyCatch = userDetailTemplate.querySelector(
    '[data-user-company-catch]'
  )
  const userCompanyBs = userDetailTemplate.querySelector(
    '[data-user-company-bs]'
  )

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

    const commentPostName = userCommentTemplate.querySelector(
      '[data-comment-post-name]'
    )
    const commentEmail = userCommentTemplate.querySelector(
      '[data-comment-email]'
    )
    const commentComment = userCommentTemplate.querySelector(
      '[data-comment-comment]'
    )

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
    const postTitle = postUserTemplate.querySelector('h4')
    const postDesc = postUserTemplate.querySelector('p')
    const userIcon = postUserTemplate.querySelector('.user-placeholder')
    const commentsIcon = postUserTemplate.querySelector('.post-comments')

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
