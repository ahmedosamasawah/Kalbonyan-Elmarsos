# Chapter 5 Code:
print("~~~ The Shimmy ~~~")
print("Take one step to the right and stomp.")
print("Take one step to the left and stomp.")
print("Shake those hips!")

#########################################
# Using Function instead
print("~~~ The Shimmy ~~~")


def shimmy():
    print("Take one step to the right and stomp.")
    print("Take one step to the left and stomp.")
    print("Shake those hips!")


shimmy()
shimmy()
shimmy()


def say_hello():
    print("Hello, friends!")


say_hello()
say_hello()
say_hello()


def wash_car():
    print("Wash with tri-color foam")
    print("Rinse twice")
    print("Dry with large blow dryer")

    print("Wash with white foam")
    print("Rinse once")
    print("Air dry")


def wash_car(amount_paid):
    if (amount_paid == 12):
        print("Wash with tri-color foam")
        print("Rinse twice")
        print("Dry with large blow dryer")

    if (amount_paid == 6):
        print("Wash with white foam")
        print("Rinse once")
        print("Air dry")


def withdraw_money(current_balance, amount):
    if (current_balance >= amount):
        current_balance = current_balance - amount
        print("The balance is", current_balance)


withdraw_money(100, 80)
##############################################


def withdraw_money(current_balance, amount):
    if (current_balance >= amount):
        current_balance = current_balance - amount
        return current_balance


balance = withdraw_money(100, 80)
if (balance <= 50):
    print("We need to make a deposit")
else:
    print("Nothing to see here!")
