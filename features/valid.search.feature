Feature: Search functionality

    Scenario Outline:  Check Search functionality for "ԲՈԼՈՐԸ" option with valid credendials

        Given Open web page
        When Choose section all
        When Type Name into search field <value1>
        When Press enter
        Then Products should be found with success message <message>
        # When Click on first item apears on the screen
        Then Products with the Apple name should be found in title <value1> <value2>

        Examples:
            | value1         | value2 | message                                               |
            | Apple          | Խնձոր  | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |
            | Red Apple      | Խնձոր  | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |
            | Red Apple      | կարմիր | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |
            | APPLE          | ԽՆՁՈՐ  | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |
            | apple          | խնձոր  | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |
            | խնձոր          | apple  | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |
            | Խնձ            | apple  | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |
            | JUICE-Necklace | վզնոց  | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |
            | sal            | սալ    | Ձեր որոնման արդյունքում գտնվել են հետևյալ ապրանքները: |

    Scenario Outline:  Check Search functionality for "ԲՈԼՈՐԸ" option with invalid credendials

        Given Open web page
        When Choose section all
        When Type Name into search field <value>
        When Press enter
        Then Products should be found with failed message <message>

        Examples:
            | value   | message                                    |
            | a       | Մուտքագրված բառը շատ կարճ է որոնման համար  |
            | gffffff | Ձեր որոնմանը համապատասխանող ապրանքներ չկան |
            |         | Մուտքագրված բառը շատ կարճ է որոնման համար  |

    Scenario Outline: Check if clicking on "Ցուցադրել բոլոր արդյունքները" opens all results found

        Given Open web page
        When Choose section all
        When Type Name into search field <value1>
        When Click on `Ցուցադրել բոլոր արդյունքները` on the results dropdown
        Then Products with the Apple name should be found in title <value1> <value2>

        Examples:
            | value1 | value2 | message      |
            | Կաթ    | milk   | Արդյունքները |

    Scenario Outline: Check if the results dropdown shows the number of results found

        Given Open web page
        When Choose section all
        When Type Name into search field <value>
        Then There is a message and numbers exist <message>

    Examples:
        | value | message      |
        | Կաթ   | Արդյունքները |

    Scenario Outline: Check search field allows maximum 30 characters

        Given Open web page
        When Choose section all
        When Type Name into search field <value>
        Then Check the length of input text

        Examples:
            | value                                |
            | sdfsdfsnsdfndfghdnghndfghnfgnhhsdfsd |

    Scenario Outline: Check Search tab shows "Որոնել․․․" message when no input typed

        Given Open web page
        When Choose section all
        Then Observe the Search tab to show initial message <value>

            Examples:
                | value     |
                | Որոնել․․․ |

    Scenario Outline: Check search field allows maximum 30 characters

        Given Open web page
        When Choose section all
        When Type Name into search field <value>
        Then The Search Input should be deleted

        Examples:
            | value                                |
            | banana |
        
