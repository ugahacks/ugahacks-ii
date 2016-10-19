require 'test_helper'

class MainControllerTest < ActionController::TestCase
  test "should get home" do
    get :home
    assert_response :success
  end

  test "should get contact" do
    get :contact
    assert_response :success
  end

  test "should get signup" do
    get :signup
    assert_response :success
  end

  test "should get stub1" do
    get :stub1
    assert_response :success
  end

  test "should get stub2" do
    get :stub2
    assert_response :success
  end

  test "should get stub3" do
    get :stub3
    assert_response :success
  end

end
