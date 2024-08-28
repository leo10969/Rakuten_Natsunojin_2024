class SessionsController < Devise::SessionsController
  def create
    self.resource = warden.authenticate!(auth_options)
    if resource
      sign_in(resource_name, resource)
      render json: { user: resource, message: 'ログインに成功しました。' } # ユーザー情報とメッセージを返す
    end
  rescue
    render json: { error: 'メールアドレスまたはパスワードが正しくありません。' }, status: :unauthorized
  end
end
