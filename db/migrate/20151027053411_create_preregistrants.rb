class CreatePreregistrants < ActiveRecord::Migration
  def change
    create_table :preregistrants do |t|

      t.timestamps null: false
      t.string :email

    end
  end
end
