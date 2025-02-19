<template></template>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  max-width: 100%;

  label {
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
  }

  input,
  select,
  textarea {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    border: 1px solid #c2c2c2;
    border-radius: 4px;
    padding: 8px 12px;
    margin-top: 5px;

    &::placeholder {
      color: #a6a6a6;
    }
  }

  .btn {
    width: fit-content;
    padding-inline: 23px;
  }
}
</style>
