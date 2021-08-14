#!/bin/bash
set -eux

git clone https://gitee.com/uni_coder/raychess.git
cd raychess
git remote add github https://github.com/UniCoderGroup/RayChess.git
git push github master -f